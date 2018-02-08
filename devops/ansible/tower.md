http://www.ansible.com/tower
AWX - versión opensource
https://www.jeffgeerling.com/blog/2017/get-started-using-ansible-awx-open-source-tower-version-one-minute
https://news.ycombinator.com/item?id=15450594


# Ejecutar en docker
git clone https://github.com/ansible/awx.git
cd awx
ansible-playbook installer/install.yml
Levanta:
  postgres
  rabbitmq
  memcached
  awx web
  awx task

Acceso en:
http://localhost
admin:password


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

ansible_facts.ansible_lsb__major_release:"7"



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
 daphne (websockets)
 uwsgi con la app?
 celeryd (workers más ¿server?)
 jupyter

El container tiene el directorio del repo montado en /awx_devel, y es lo que usa par correr.



## Recibiendo una peticion en la api
curl -u admin:password http://localhost/api/v2/hosts/\?page_size\=20\&order_by\=name\&host_filter\=variables__icontains\=estado

  /usr/lib/python2.7/site-packages/awx/api/views.py(2124)list()
    aqui tenemos la petición, con sus parametros, etc

  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/mixins.py
    aqui tenemos la petición y parece que es donde se realiza el filtrado y se extraen los datos
      queryset = self.filter_queryset(self.get_queryset())
        self.get_queryset() es la clave
          ...
          /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/manager.py:153 (get all() porque somos admin)
            > /usr/lib/python2.7/site-packages/awx/main/managers.py(31)get_queryset()
              """When the parent instance of the host query set has a `kind=smart` and a `host_filter`
  	          set. Use the `host_filter` to generate the queryset for the hosts."""

  	          > /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/query.py(161)__init__()
  	          parece que aqui es donde vamos a generar la query


  	          > /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/sql/compiler.py(855)execute_sql()
              donde se ejecuta el sql

Cuando hacemos un variables.icontains lo que hace es un LIKE en el field "variables" de la tabla de postgres.

Cuando filtramos por un ansible fact hace otra cosa:
http://localhost/api/v2/inventories/?page_size=20&order_by=name&search=ansible_facts.ansible_lsb__major_release:7&variables__icontains=FOO

Lo pasa como un "search".
Los ansible_facts también están almacenados en la postgres como un jsonb


Por lo que he visto, cuando usamos search lo que hace es un like contra description y contra name.
Mirar como se implementa search y tambien quien decide como se debe formular la query, porque hay ciertas palabras que ponemos en el buscador que si las pone tal cual. Ejemplo: variables, kind
  como formar la query tiene que ser el javascript



