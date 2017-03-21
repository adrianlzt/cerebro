https://docs.docker.com/engine/swarm/swarm-mode/

Gestión de varios docker host como uno solo.
Nos permite asignar recursos

Swarm manager: el que recibe las ordenes y ve donde ejecutarlas

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


# Desplegar
systemctl start docker
docker swarm init

Nos pasa un comando para agregar mas dockerd a este swarm (cluster)
Para mostrar el comando de nuevo: docker swarm join-token worker

Si queremos agregar mas manager tendremos que usar otro token, que conseguimos asi:
docker swarm join-token manager


# Administracion

## nodos
docker node list
  para ver la lista de managers y nodes


## Services
Es el concepto "container" para cluster.
Le decimos que service queremos crear un cuantas copias debe haber.
El se encarga donde levantar los containers que sean necesarios



# Instrucciones para montar un docker swarm usando la imagen swarm (antiguo)

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
