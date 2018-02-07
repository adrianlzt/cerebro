http://www.ansible.com/tower

Dashboard para ansible. De pago.
Gratis (trial) hasta 10 máquinas.

# AWX - versión opensource
https://www.jeffgeerling.com/blog/2017/get-started-using-ansible-awx-open-source-tower-version-one-minute
https://news.ycombinator.com/item?id=15450594


# Seguridad
Cuidado con la seguridad de Tower. Es un punto de acceso para poder controlar todas las máquinas



# Agregar inventarios dinámicos
https://github.com/confirm/ansible-git-inventory



# Inventario
Cuando generamos un inventario este se almacena internamente en tower.

Podemos usar inventory plugins para generar el inventario. Tendremos que modificar /etc/ansible/ansible.cfg
[inventory]
# enable inventory plugins, default: 'host_list', 'script', 'yaml', 'ini'
#enable_plugins = host_list, virtualbox, yaml, constructed
enable_plugins = ucmdb, script

En este caso pongo el de ucmdb para recoger los valores del inventario y luego el script para cuando se lance el ansible.
En el script que cargamos en la interfaz web pondremos la configuración del plugin del inventario (con un shebang para que no proteste)

Cuando luego queremos usarlo lo que hace tower es generar un script en python que hace un print del json del inventario almacenado.


## Filtrar en el inventario

Por nombre de grupo:
groups.name:NOMBRE

Por variables del host:
variables.icontains:FOO


Poder buscar por una variable en concreto aun no se puede: https://github.com/ansible/awx/issues/371


# Desarrollo
git clone https://github.com/ansible/awx.git
cd awx
mirar CONTRIBUTING.md

make docker-compose-build
  construir la imagen base

docker run --rm -it -v "$PWD:/mnt" -w /mnt node:6 npm --unsafe-perm --prefix awx/ui install awx/ui
  en la doc hace "make ui-devel", pero yo no tengo localmente el node v6 que hace falta

Para arrancar el entorno de dev:
make docker-compose
  arranca varios servidores que necesita:
    postgres
    rabbitmq
    memcached
    logstash (para?)
  y arranca tambien el propio servicio:
    awx (con la imagen que construimos antes: gcr.io/ansible-tower-engineering/awx_devel)

En el primer arranque tardará un rato hasta que realice las migraciónes en la base de datos
Tras esas migraciones podremos entrar a la interfaz web en
http://localhost:8013
https://localhost:8043
http://localhost:8888 -> jupyter (para?)

Tengo la sensación que si escribo cualquier cosa en la terminal del docker-compose, se para el container de awx

En el container de awx corren muchas cosas:
 nginx
 worker websocket
 callback receiver
 daphne
 uwsgi con la app?
 celeryd (workers más ¿server?)
 jupyter

El container tiene el directorio del repo montado en /awx_devel, y es lo que usa par correr.
