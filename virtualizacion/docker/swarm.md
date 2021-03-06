swarm-mode implementacion de swarmkit.

Doc: https://github.com/jpetazzo/orchestration-workshop

Interfaz web -> portainer.md https://swarmpit.io/ (mirar más abajo para swarmpit)

# Swarm Mode (v >= 1.12)
https://docs.docker.com/engine/swarm/swarm-mode/
https://docs.docker.com/engine/swarm/swarm-tutorial/#set-up
https://www.youtube.com/watch?v=_o9hQ5CRCWs&feature=youtu.be

built into docker engine
dynamic by design (?)
based on service model (desplegamos servicios)
higly scalable
multi-host networking by default (redes overlay) (mesh networking) (pueden estar encriptadas)
  las redes overlay solo existen en los manager, hasta que alguna task que necesita esa red en un worker
internal service descovery
internal load balancer
secure by default (comunicaciones entre containers seguras por defecto y entre hosts)
Rolling updates (podemos hacer actualizaciones de las versiones de los containers)
No hace falta un almacenamiento KV externa

Al iniciar un swarm:
 - se crea un storage distribuido
 - red de tráfico compartida (overlay, encriptada, con su propia CA)

Despliegue de contenedores Spread (menos cargado).

Gestión de varios docker host como uno solo.
Nos permite asignar recursos

## nodes
Es el rol del host: manager (con un lider) y workers
Solo el lider hace cambios
5,7 manager son más que suficientes


## servicios
Es el equivalente a los "containers" en docker. Es la unidad que desplegamos.


## tasks
Son contenedores corriendo.
El cluster se encarga de mantener siempre el número de containers que hayamos especificado.
Si se cae una, el container levanta otra

## stacks
Es lo que nosotros desplegamos.
Donde ponemos que queremos desplegar, como se comunican, etc
Fichero YAML
Parecido a compose.
No usar bundles (ya no se usan)


# Desplegar
systemctl start docker
  en todos los nodos

docker swarm init
  en uno de los nodos
  ha creado la red overlay (podemos verla con: docker network ls, se llamara "ingress". Routing mesh)
  y un storage distribuido (como funciona?)

docker swarm init --default-addr-pool 10.20.0.0/16
  por si queremos que el pool de redes coja otra subred que no sea 10.0.0.0/8

Si tenemos varias interfaces tendremos que decir cual usar: --advertise-addr 10.0.1.187

Mirar los logs de docker por si ha dado algún fallo (tambien al unir los workers y managers):
journalctl -n 100 -u docker


Nos pasa un comando para agregar mas dockerd a este swarm (cluster) como workers (luego podremos cambiar su rol a master)
Para mostrar el comando de nuevo: docker swarm join-token worker

Si queremos agregar mas manager tendremos que usar otro token, que conseguimos asi:
docker swarm join-token manager

Por defecto los nodos manager también corren containers.

Deberemos tener un número impar de managers.
Para clusters pequeños 3, para culster más grandes 5 o 7 (parece que no hace falta subir más de 7, muchos managers puede tardar mucho en elegir un nuevo lider en caso de que se pierda)
La bbdd del cluster se distribuye entre los master.




# Administrar nodos
docker node list
  para ver la lista de managers y nodes

docker node promote <NODE>
docker node update --role manager <NODE>
  pasar un nodo worker a master

docker node demote <NODE>
docker node update --role worker <NODE>
  pasar un nodo master a worker

## info de un nodo
docker node inspect --pretty <NODE>


## pause
docker node update --availability pause <NODE>
  Este nodo no acepta nuevas tasks

## downtime / drain
docker node update --availability drain <NODE>
  saca los containers y los arranca en otro lado antes de pararlo
  no espera a que estén corriendo en otro nodo
    hacer pull de las imagenes en los otros nodos antes para acelerar la migracion?
    un truco podría ser ponerlo en pause, hacer update de todos los services y luego el drain
  tambien quita los containers globales, si tiene
  Podriamos forzar la vuelta de containers con un rolling update --force. Ejemplo:
    docker service update --update-parallelism 1 --force NombreServicio

## active
docker node update --availability active <NODE>
  para volverlo a poner en active
  no vuelven tareas (si los globales)

## sacar nodo de un cluster
docker swarm leave
  en el nodo que quremos sacar
  previamente tenemos que quitarnos de master
  aparecerá como down en "docker node list"
  Para volverlo a meter al cluster tendremos que volverle a pasar el cmd de swarm join
  Si no lo habiamos borrado, veremos dos nodos con el mismo nombre, borraremos el antiguo.

## borrar nodos
docker node rm <NODE>
  previamente habremos quitado el rol manager, luego hecho un drain y un leave
  esto lo ejecutamos en uno de los nodos que si se mantienen en el cluster

## tags
docker node update --label-add tipo=mega <NODE>
  añadir tag a un nodo

docker node inspect <NODE>
  consultar tags (junto con el resto de datos)




## Services
mirar services.md


# Load balancer / publishing ports
Usaremos --publish NN:BB para publicar puertos
https://docs.docker.com/engine/swarm/ingress/#configure-an-external-load-balancer
Podremos acceder al servicio publicado en cualquiera de los nodos del cluster (managers y workers, docker enrutara la peticion hasta el nodo correcto)
Swarm hará de balanceador.
Para probar atacar a 127.0.0.1:puerto (localhost:puerto no funciona porque intenta acceder por IPv6 por defecto)

Haciendo una prueba no funciona, no contesta en el puerto en ninguna de las máquinas.
Parece que falta algo para enrutar correctamente. Si hago un inspect del container tiene una ip de una red overlay que ha creado el swarm, pero parece que el SO no conoce como enrutar los paquets (no veo nada que parezca server en 'ip r' ni en iptables? Usar ipv4? Atacar desde fuera del nodo?

Si usamos el mode=host, cada host reenvia el trafico al task que tenga corriendo localmente. Ver nota en https://docs.docker.com/engine/swarm/services/#publish-a-services-ports-directly-on-the-swarm-node

Si queremos publicar un puerto de un servicio ya activo (PARARÁ los containers ejecutándose y levantará unos nuevos!!):
docker service update  --publish-add <PUBLISHED-PORT>:<TARGET-PORT> <SERVICE>

Si el servicio se para, automaticamente se arrancará de nuevo.

Proxy delante del routing mesh
https://github.com/vfarcic/docker-flow-proxy
http://proxy.dockerflow.com/
traefik parece que es el mejor


Otras opciones en vez de usar el routing mesh:
https://github.com/moby/moby/issues/23813#issuecomment-229456775
Start the service using endpoint-mode as dnsrr(but still expose ports) so a vip won't be allocated for the service.
You could stand up an L7 LB (like ha-proxy or nginx or F5) exposing the ports that you want the LB to service.

Routing mesh con session stickiness
https://github.com/docker/swarmkit/issues/1077


### Listar services
docker service ls

### Info de un service
docker service inspect --pretty helloworld
docker service ps helloworld
  este nos dice donde está corriendo

### Escalar un servicio (hacia arriba o abajo)
docker service scale helloworld=5

### Parar un servicio
docker service scale helloworld=0

### Borrar un service
docker service rm helloworld

### Actualizando servicios / rolling updates
https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/

Caso, tenemos containers de una version y queremos actualizarlos:
docker service create --replicas 3 --name redis --update-delay 10s redis:3.0.6
  --update-delay tiempo de espera entre actualizaciones de containers
  tambien se puede definir que pasa si falla la actualizacion
  y de cuantas en cuantas se deben hacer (paralelismo)

docker service update --image redis:3.0.7 redis
Este comando irá deteniendo los containers antiguos y desplegando la nueva versión.

Tambien tenemos --rollback, para volver a la anterior (sabe que imagen estaba antes)


## Producción
Que todos los hosts tengan descargados todos los containers, para en caso de caida se levanten más rápido.
Tambien para que los updates se hagan más rápidos.


## Pruebas cluster

### Hacemos un drain de un host
Tiene un container nginx corriendo
En unos 8" ya se ha levantado en otro nodo
La velocidad dependerá de si el host donde se mueve tiene ya el container

### Tirar el manager, donde estan corriendo dos containers
Reiniciamos de forma brusca el host lider
En pocos segundos (<10") se ha elegido un nuevo lider.
Y en menos de un minuto los containers ya se encuentran corriendo en otro nodo.


## Secretos
mirar secrets.md


## Errores

Al crear un service:
unable to pin image nrpe to digest: errors:
denied: requested access to the resource is denied
unauthorized: authentication required

Esto parece que es porque la imagen no existe




## Dudas
Como hacer routing con dns round robin? El routing mesh nos envia a una VIP y de ahi a cualquiera de los servers. La de DNS como funciona? Algo ha dicho que nos da la ip de alguno de los hosts directamente?

Swarm no creaba un storage compartido? Con el stack que creado para WP no veo que se comparta. Algo que poner?
Usar drivers se storage. En principio buscar una cabina que tenga driver certificado.

Para tener entornos de dev, int, prod. Montas todas las maquinas creando un unico cluster, o distintos clusters?
Parece que google datacenter tiene gestion de usuarios y puede hacer que un usuario solo pueda lanzar en una etiqueta.









ANTIGUO!!

# Instrucciones para montar un docker swarm usando la imagen swarmkit (antiguo)

# Filtering
Cada docker host se etiqueta con las "cualidades" que tiene. Por ejemplo, donde se encuentra, que tipo de discos tiene, entorno, etc.
Cuando lanzamos un container especifícamos unos tags para decir donde debe correr.
Filtering coge la lista de hosts y nos devuelve los que cuadran según las necesidades que hemos pedido.

## Affinity
Ejecutar un container donde esté otro container y una imagen

## Resource
Ejecutar un container donde haya un recurso que queremos libre. Por ejemplo, donde esté el puerto 8080 libre

## Contraint
Filtrar usando las variables que devuelve "docker info"
Tambíen podemos poner custom labs


# Scheduling
Una vez tenemos la lista de docker host provista por Filtering, tenemos que elegir en que host en particular lanzamos nuestro container.
Solo puede haber una estrategia de scheduling para todo el cluster.

Hay tres estrategias: Random (parece útil solo para testear), Spread (por defecto), Binpack. Tambien podemos crear el nuestro propio
Spread y Binpack son conscientes de la CPU y RAM de los docker host. Los container stop también cuentan.

Binpack: almacenar todos los containers en el mismo docker host hasta llegar al máximo que hayamos marcado.
Este método siempre escoge los nodos más pequeños primero, dejando lo más grandes por si luego hiciese falta montar un container más grande (si tenemos dos docker host, uno con 2GB y otro con 4GB; primero se le pide montar un container de 2GB y luego otro de 3GB; al hacerlo primero en el más pequeño luego podremos montar el de 3GB; si lo hiciesemos al revés no habría hueco para el segundo container)
El "problema" es que podemos estar dejando el docker host más potente sin usar.

# Discovery
bbdd clave-valor donde se almacena el estado del cluster y su configuración

Posibilidades: Consul, etcd, Zookeper
La libreria libvkv se encarga de hablar con estos backends

La configuración se puede regenerar en caso de que la bbdd se perdiese.

La bbdd lo mejor es que sea HA para evitar tener una pérdida.


# Swarm manager
El que recibe las ordenes y ve donde ejecutarlas
Soporta HA y es importante tenerlo configurado.
En caso de que se cayese el cluster seguiría funcionando, pero no podría desplegar nuevos contenedores.


## HA
Se elige un primario que es el único que manda comandos.
Podemos atacar a un secundario, que solo hará de proxy y enviará la petición al primario.
Si el primario cae, se hace una votación para elegir otro primario.





# Despliegue
Desplegamos el discovery y docker manager sobre tres VMs distintas (y a ser posible, separadas físicamente, evitando SPoF)
La VM tendrá a su vez docker. Discovery y Manager serán containers corriendo dentro de esta vm.


## Discovery
Montar un cluster de etcd
alta_disponibilidad/etcd.md

## Manager
Ahora vamos a levantar los manager.
Tendremos que pasarle la key-value store que hayamos elegido. En este ejemplo, etcd

Lanzamos esto en las 3 VMs:
docker run --restart=unless-stopped -d -h manager_$(hostname) --name manager_$(hostname) -p 3375:2375 swarm manage --replication --advertise ${IP}:3375 etcd://172.16.1.28:2379,172.16.1.29:2379,172.16.1.30:2379/miswarm
  --replication es para decirle que va a ser parte de un multi manager config
  --advertise sera la ip de la VM, donde deberan poder llegar los otros swarm manager que vamos a montar
  etcd:// las ips del cluster de etcd (puerto cliente, 2379). Creará ahi un arbol tipo: /docker/swarm/... Podemos ponerle un prefijo, como "miswarm" para que cree las cosas bajo el

Si vemos las trazas (con docker logs ID), veremos que el primer nodo que arrancamos se vuelve el leader del cluster. Los otros al conectar advierten que que ese primero es el lider.
Se utiliza la store k-v para almacenar quien es el lider.
En el caso de etcd lo podemos consultar con:
curl -sL http://127.0.0.1:2379/v2/keys/docker/swarm/leader | python -m "json.tool"

Ahora si atacamos con docker-cli cualquiera de los puertos 3375 será el lider quien conteste (el resto solo harán de proxy contra él)
docker -H 127.0.0.1:3375 ps



## Agregar docker host al cluster
Estos comandos los ejecutaremos en las máquinas donde se van a montar los containers.

Levantaremos un container swarm al que le pasaremos la info para acceder al store k-v.
Este container se registrará (cada minuto por defecto) en la store k-v, de esta manera el manager leader podrá saber que docker host estan activos y enviarles comandos
docker run -d -h join --name join swarm join --advertise=${IP}:2375 etcd://172.16.1.28:2379,172.16.1.29:2379,172.16.1.30:2379/

El parametro --advertise será el IP:Puerto donde los manager deberán enviar los comandos para ejcutar cosas en este docker host.

Podemos consultar los docker host (nodes) registrados con:
curl -sL http://127.0.0.1:2379/v2/keys/docker/swarm/nodes | python -m "json.tool"



## Network
https://docs.docker.com/engine/swarm/networking/

Para crear redes compartidas entre los nodos del cluster especificaremos el driver overlay:
docker network create --driver overlay prueba

Si ponemos "internal: true", los nodos no podran salir a internet.

Estas redes por defecto asignan una VIP compartida por todas las tasks del service.
Esa ip será la que se asocie al registro DNS con el nombre del service.

tasks.NOMBRESRV resolverá con varios registros A (round-robin, variando cual es el primero), uno por cada task

NOMBRESRV.n.identificadorContainer tambien existe, pero debemos conocer ese identificador

Si arrancamos el service con "--endpoint-mode dnsrr", el dominio de NOMBRESRV actuará como tasks.NOMBRESRV, round-robin con los registros A de las tasks.


Si no marcamos la red como attachable (--attachable), solo se podran a una red overlay services de swarm (no containers lanzados sin ser parte de un service)
Parece que no se puede modificar una erd a posteriori.


Problemas conectando a puertos del mesh networking atacando desde el propio docker host a si mismo:
https://github.com/moby/moby/issues/26235
Parece que puede ser algo con centos. No se si es culpa de esa issue.
No usar localhost porque puede resolver a ipv6 y falla.



## API
https://github.com/docker/swarmkit/issues/491
PR para tener los eventos del swarm



# swarmpit
Install:
docker run -it --rm --name swarmpit-installer --volume /var/run/docker.sock:/var/run/docker.sock swarmpit/install:edge
Nos preguntará ciertas cosas (puerto, user, pass)
Por defecto se configura en el puerto 888
