https://docs.docker.com/engine/swarm/swarm-mode/

Gestión de varios docekr host como uno solo.
Nos permite asignar recursos


systemctl start docker
docker swarm init

Nos pasa un comando para agregar mas dockerd a este swarm (cluster)
Para mostrar el comando de nuevo:

docker swarm join-token worker


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

Desplegar tres al menos, entres VMs separadas sobre tres nodos físicos distintos.

## HA
Se elige un primario que es el único que manda comandos.
Podemos atacar a un secundario, que solo hará de proxy y enviará la petición al primario.
Si el primario cae, se hace una votación para elegir otro primario.


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




