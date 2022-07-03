Otra alternativa, en go.
https://ansible-semaphore.com/

http://www.ansible.com/tower
AWX - versión opensource
https://www.jeffgeerling.com/blog/2017/get-started-using-ansible-awx-open-source-tower-version-one-minute
https://news.ycombinator.com/item?id=15450594


# Ejecutar en docker
git clone https://github.com/ansible/awx.git
cd awx
ansible-playbook -i installer/inventory installer/install.yml
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

La versión de ansible que utilizará será la que instale con dnf
https://github.com/ansible/awx/blob/eafd40291e786599c712b36bc4012199619a97fc/installer/roles/image_build/templates/Dockerfile.j2#L11


# Virtualenvs
https://github.com/ansible/awx/blob/84b5fb89a3865ebed98f2737b63e448c34ceffb2/docs/custom_virtualenvs.md

Por defecto las jobs se lanzan con el venv /var/lib/awx/venv/ansible

Podemos crear otros venv custom para correr nuestras jobs.

Existe otro venv /var/lib/awx/venv/awx
No tengo claro que uso se le da



# awx-manage
comandos para gestionar/administrar awx
awx/main/management/commands/

Creo que extienden los de django
    from django.core.management import execute_from_command_line


# tower-cli
https://github.com/ansible/tower-cli
https://tower-cli.readthedocs.io/en/latest/
Para hablar con tower/awx mediante una cli

pip install ansible-tower-cli
yay tower-cli
  arch linux

Config
tower-cli config host http://host.com:8071
tower-cli config username XXX
tower-cli config password XXX
  nuevas versiones usan "tower-cli login"

tower-cli version
  para chequear que conecta

Exportar todo el contenido de config de AWX:
tower-cli receive --all > awx_$(date +%Y%m%d).json

Restaurar:
tower-cli send awx_$(date +%Y%m%d).json


# Migrar
https://github.com/autops/awx-migrate

Lo que hace el script:
  Mete las settings de la bbdd en la nueva
  Exporta todo con tower-cli y lo mete en la nueva

A mano:
Sacarnos la config de la bbdd:
pg_dump -d awx -t conf_setting  > conf_setting.sql

Exportar y restaurar como pone en la sección de tower-cli



# Seguridad
Cuidado con la seguridad de Tower. Es un punto de acceso para poder controlar todas las máquinas


# Clonar repo
## paso de claves ssh
/tmp/awx_105_1YvAML/credential_2 será un fifo

\_ sh -c ssh-add /tmp/awx_105_1YvAML/credential_2 && rm -f /tmp/awx_105_1YvAML/credential_2 && ansible-playbook -i localhost, -v -e @/tmp/awx_105_1YvAML/tmpEdKhoR project_update.yml
    \_ /usr/bin/ssh-agent -a /tmp/awx_105_1YvAML/ssh_auth.sock sh -c ssh-add /tmp/awx_105_1YvAML/credential_2 && rm -f /tmp/awx_105_1YvAML/credential_2 && ansible-playbook -i localhost, -v -e @/tmp/awx_105_1
    \_ /usr/bin/python2 /usr/bin/ansible-playbook -i localhost, -v -e @/tmp/awx_105_1YvAML/tmpEdKhoR project_update.yml

## Playbook
/usr/lib/python2.7/site-packages/awx/playbooks/project_update.yml

https://github.com/ansible/awx/issues/1559#issuecomment-373084755
Se llama a ese role dos veces.
Una como parte de la actualización del repo (sin bajarse roles). De esta veremos una tarea en la pestaña "Trabajos".
Una segunda vez que si se bajará roles (por tener la variable scm_full_checkout a true), que no veremos en "Trabajos". Pero podemos verla yendo a "Trabajos" y pulsando sobre el icono verde.
El ID de este job "escondido" deberá ser más alto que el id del job de ejecuccuión del playbook.

Si miramos en la api el job de ejecución del playbook: http://lep1maa1:8071/api/v2/jobs/
La actualización "escondida" lo veremos en: "project_update": "/api/v2/project_updates/127/"




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


## Smart inventory
De todas las máquinas localizadas por inventarios no smart, con los inventarios smart podemos hacer un subconjunto filtrando por un ansible_fact o variable.


## Filtrar en el inventario

Por nombre de grupo:
groups.name:NOMBRE

Por variables del host:
variables.icontains:FOO

ansible_facts.ansible_lsb__major_release:"7"



Poder buscar por una variable en concreto aun no se puede: https://github.com/ansible/awx/issues/371




# SQL

Tabla con las jobs
main_job
Las jobs "nivel usuario".
select * from main_job where unifiedjob_ptr_id=727;

Buscar por algún parámetro de las extra_vars
select * from main_job where extra_vars like '%cpu%';

En esta vemos el resultado, comando ejecutado, todas las env, donde se ejecuta, etc
main_unifiedjob
select * from main_unifiedjob where id=727;


Toda la info junta
select * from main_job join main_unifiedjob ON (id=unifiedjob_ptr_id);


Resultados de una ejecucción (las líneas/eventos) para el job 950:
select event_data from main_jobevent where job_id=950;


Tabla actualizaciones projects:
main_projectupdate
Solo tiene las peticiones.
Si queremos ver los resultados hacer un join con la main_unifiedjob
select * from main_projectupdate join main_unifiedjob ON unifiedjob_ptr_id=id order by unifiedjob_ptr_id


Tabla de projects
select * from main_unifiedjobtemplate join main_project ON unifiedjobtemplate_ptr_id=id where id=116;


Tablas de plantillas/templates
select * from main_jobtemplate join main_unifiedjobtemplate ON (id=unifiedjobtemplate_ptr_id) where id=166;


Plantillas + projects (con su scm_url y scm_branch)
select utemplate.id as template_id, utemplate.name as template, uproject.id as project_id, uproject.name as project, project.scm_url, project.scm_branch from main_jobtemplate template join main_unifiedjobtemplate utemplate ON (utemplate.id=template.unifiedjobtemplate_ptr_id) join main_project project ON (template.project_id=project.unifiedjobtemplate_ptr_id) join main_unifiedjobtemplate uproject ON (uproject.id=template.project_id);



Resultados de un job agrupados en un json, añadiendo info extra
select
  json_build_object(
    'name', name,
    'description', description,
    'status', status,
    'started', started,
    'finished', finished,
    'elapsed', elapsed,
    'extra_vars', extra_vars,
    'limit', "limit",
    'execution_node', execution_node,
    'template', 'file://awx__template__test_callback.j2',
    'data',
    json_agg(
      event_data :: jsonb
      order by
        counter asc
    )
  )
from
  main_job
  join main_unifiedjob uj ON (uj.id = unifiedjob_ptr_id)
  join main_jobevent ON (job_id = uj.id)
where
  uj.id = 311
group by
  name,
  description,
  status,
  started,
  finished,
  elapsed,
  extra_vars,
  "limit",
  execution_node
  ;

JSON con el resultado de un job (resultado general con todos los hosts, la típica seccion al final)
select jsonb_pretty(event_data::jsonb) from main_jobevent where job_id=9199 and event = 'playbook_on_stats';

Tabla con el host y el número de oks que ha tenido:

with data as (
  select
    event_data :: jsonb -> 'ok' as hosts
  from
    main_jobevent
  where
    job_id = 9216
    and event = 'playbook_on_stats'
)
select
  q.key as host,
  q.value as ok_count
from
  data d
  join jsonb_each_text(d.hosts) q on true;





main_host
hosts obtenidos de los inventarios

Hosts RHEL6 que no sean baja
select name from main_host where variables like '%RED HAT ENTERPRISE LINUX SERVER RELEASE 6%' and name not like '%_baja';


# Debug
Si queremos capturar lo que está ejecutando awx, entraremos en el container task y:
cd /tmp
while true; do  cp -fr awx* AWX/; sleep 0.5; done
Al terminar deberemos tener uno o varios directorios en /tmp/AWX

## worker
Si queremos ver que están haciendo los run_dispatchers
/usr/bin/awx-manage run_dispatcher --status
https://github.com/ansible/awx/blob/fcfd59ebe26d0051a838ea395d05665dba0db15d/docs/tasks.md#debugging


# API

## towerlib
https://towerlib.readthedocs.io/en/latest/usage.html
pip install towerlib

from towerlib import Tower
tower = Tower('awx.com:8071', 'admin', 'admin')
job_postcheck = tower.get_job_template_by_name("foobar")
j = job_postcheck.launch(extra_vars={"foo": "bar"}, limit="somhost")
j.id
j.status
j.stdout


## raw
Enrutado api (es django)
https://github.com/ansible/awx/blob/devel/awx/api/urls/urls.py

Filtrados posibles: https://docs.ansible.com/ansible-tower/2.3.0/html/towerapi/intro.html
Ejemplo:
http://AWX/api/v2/job_templates/12/jobs/?limit=HOSTPRUEBA&created__gte=2019-12-17T15:14:00Z

started__lt=2019-12-16T18:40:59.000000%2B0100
%2B es +, por lo que estamos poniendo el time zone +1

order_by=-id
orden inverso del campo "id"

Si le preguntamos OPTIONS nos da info de como hacer las queries.


api/v2/jobs/?or__status=waiting&or__status=pending&or__status=new

no podemos filtrar por "elapsed" mientras está running, porque se pone en la bd al terminar.




# Desarrollo
git clone https://github.com/ansible/awx.git
cd awx
mirar CONTRIBUTING.md


## Build
Hacer build de las imágenes:
ansible-playbook installer/build.yml
  hay un bug que hace necesario usar python docker<3.0 (20/2/2018)

make docker-compose-build
  construir la imagen base

docker run --rm -it -v "$PWD:/mnt" -w /mnt node:6 npm --unsafe-perm --prefix awx/ui install awx/ui
  en la doc hace "make ui-devel", pero yo no tengo localmente el node v6 que hace falta
  con node9 al principio no me tiraba pero luego si, no se que cambie.
  con lo de docker no parecia que funcionase

Para arrancar el entorno de dev:
make docker-compose
  entrypoint: tini, cmd: /start_development.sh
    tools/docker-compose/start_development.sh
      que tambien llama a tools/docker-compose/bootstrap_development.sh
        espera que levante postgres, rabbit, memcached
        crea users en postgres y la bbdd
        make version_file
        make migrate
          awx-manage migrate --noinput --fake-initial
        make init
  arranca varios servidores que necesita:
    postgres
    rabbitmq
    memcached
    logstash (para?)
  y arranca tambien el propio servicio:
    awx (con la imagen que construimos antes: gcr.io/ansible-tower-engineering/awx_devel)

En el primer arranque tardará un rato hasta que realice las migraciónes en la base de datos
Tras esas migraciones podremos entrar a la interfaz web en
http://localhost:8013 -> ui de tower
https://localhost:8043 -> ui de tower
http://localhost:8888 -> jupyter (para?)

Para entrar tenemos que crear primero un user
docker exec -it tools_awx_1 bash
awx-manage createsuperuser



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

Si modificamos algo del backend (python), uwsgi se recargará automáticamente.

Para el frontend tendremos que lanzar: make devel-ui


# Actualización proyectos
Hay un role que se encarga:
https://github.com/ansible/awx/blob/devel/awx/playbooks/project_update.yml



# Internals (versión antigua)

Cuando hacemos un variables.icontains lo que hace es un LIKE en el field "variables" de la tabla de postgres.

Cuando filtramos por un ansible fact hace otra cosa:
http://localhost/api/v2/inventories/1/hosts/?page_size=20&order_by=name&host_filter=ansible_facts__os=linux
http://localhost/api/v2/inventories/        ?page_size=20&order_by=name&search=ansible_facts.ansible_lsb__major_release:7

Lo pasa como un "search".
Los ansible_facts también están almacenados en la postgres como un jsonb


Por lo que he visto, cuando usamos search lo que hace es un like contra description y contra name.
Mirar como se implementa search y tambien quien decide como se debe formular la query, porque hay ciertas palabras que ponemos en el buscador que si las pone tal cual. Ejemplo: variables, kind
  como formar la query tiene que ser el javascript


/home/adrian/Documentos/opensolutions/carrefour/cmdb/awx/awx/ui/client/src/shared/smart-search/smart-search.controller.js 200
aqui se distingue si estamos buscando por "ansible_facts" o por otra cosa
La diferencia es que la función qs.encodeParam( para ansible es "searchTerm: true" y para el resto "relatedSearchTerm: true"
Pero probando la UI no parece entrar ahi.


Parece que el funcionamiento entre buscar contra la api de hosts (aqui si puede filtrar por ansible_facts):
  http://localhost:8013/api/v2/hosts/?page_size=20&order_by=name&host_filter=ansible_facts__os=linux
o contra la api de un inventario determinado, en su sección host (aqui no filtra por ansible_facts):
  http://localhost:8013/api/v2/inventories/1/hosts/?page_size=20&order_by=name&ansible_facts__os=linux


Hay otro sitio donde hacen referencia al ansible_facts
processJson: function(data) {
  var ignored = ["type", "event_data", "related", "summary_fields", "url", "ansible_facts"];
  return _.chain(data).cloneDeep().forEach(function(value, key, collection) {
    ignored.indexOf(key) > -1 && delete collection[key]
  }).value()
}


Una url de ejemplo preguntando por un ansible fact:
curl -u admin:password http://localhost/api/v2/hosts/\?page_size\=20\&order_by\=name\&host_filter\=variables__icontains\=estado4\&host_filter\=ansible_facts__fo2\=bar

La query que veo contra el postgres
SELECT COUNT(*) FROM (
  SELECT DISTINCT
    "main_host"."id" AS Col1,
		"main_host"."created" AS Col2,
		"main_host"."modified" AS Col3,
		"main_host"."description" AS Col4,
		"main_host"."created_by_id" AS Col5,
		"main_host"."modified_by_id" AS Col6,
		"main_host"."name" AS Col7,
		"main_host"."inventory_id" AS Col8,
		"main_host"."enabled" AS Col9,
		"main_host"."instance_id" AS Col10,
		"main_host"."variables" AS Col11,
		"main_host"."last_job_id" AS Col12,
		"main_host"."last_job_host_summary_id" AS Col13,
		"main_host"."has_active_failures" AS Col14,
		"main_host"."has_inventory_sources" AS Col15,
		"main_host"."ansible_facts" AS Col16,
		"main_host"."ansible_facts_modified" AS Col17,
		"main_host"."insights_system_id" AS Col18
  FROM "main_host" WHERE "main_host"."ansible_facts" @> %s
)
subquery, params: (<psycopg2._json.Json object at 0x79f1510>,)
El param será: '\'{"fo2": "bar"}\''

El stack que llama a esta query sql:

  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/handlers/wsgi.py(157)__call__()
-> response = self.get_response(request)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/handlers/base.py(124)get_response()
-> response = self._middleware_chain(request)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/handlers/exception.py(41)inner()
-> response = get_response(request)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/handlers/base.py(249)_legacy_get_response()
-> response = self._get_response(request)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/handlers/base.py(185)_get_response()
-> response = wrapped_callback(request, *callback_args, **callback_kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/utils/decorators.py(185)inner()
-> return func(*args, **kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/views/decorators/csrf.py(58)wrapped_view()
-> return view_func(*args, **kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/views/generic/base.py(68)view()
-> return self.dispatch(request, *args, **kwargs)
  /usr/lib/python2.7/site-packages/awx/api/generics.py(253)dispatch()
-> return super(APIView, self).dispatch(request, *args, **kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/views.py(486)dispatch()
-> response = handler(request, *args, **kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/generics.py(201)get()
-> return self.list(request, *args, **kwargs)
  /usr/lib/python2.7/site-packages/awx/api/views.py(2124)list()
-> return super(HostList, self).list(*args, **kwargs)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/mixins.py(42)list()
-> page = self.paginate_queryset(queryset)
  /usr/lib/python2.7/site-packages/awx/api/generics.py(329)paginate_queryset()
-> page = super(ListAPIView, self).paginate_queryset(queryset)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/generics.py(173)paginate_queryset()
-> return self.paginator.paginate_queryset(queryset, self.request, view=self)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/rest_framework/pagination.py(215)paginate_queryset()
-> self.page = paginator.page(page_number)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/paginator.py(57)page()
-> number = self.validate_number(number)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/paginator.py(46)validate_number()
-> if number > self.num_pages:
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/utils/functional.py(35)__get__()
-> res = instance.__dict__[self.name] = self.func(instance)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/paginator.py(91)num_pages()
-> if self.count == 0 and not self.allow_empty_first_page:
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/utils/functional.py(35)__get__()
-> res = instance.__dict__[self.name] = self.func(instance)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/core/paginator.py(79)count()
-> return self.object_list.count()
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/query.py(370)count()
-> return self.query.get_count(using=self.db)
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/sql/query.py(499)get_count()
-> number = obj.get_aggregation(using, ['__count'])['__count']
  /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/sql/query.py(480)get_aggregation()
-> result = compiler.execute_sql(SINGLE)
> /var/lib/awx/venv/awx/lib/python2.7/site-packages/django/db/models/sql/compiler.py(891)execute_sql()
-> logger.debug("++++ execute sql: %s, params: %s", sql, params)


No he encontrado nada util por el stack.
La llamada sql se realizaba para obtener una de las paginas de resultados, pero la query parece que ya estaba formada?

/usr/lib/python2.7/site-packages/awx/main/models/inventory.py
aqui se definen que tipos de datos se almacenan en la bbdd, siendo variables text y ansible_facts un json



/usr/lib/python2.7/site-packages/awx/main/utils/filters.py
aqui se implementa el "smart filter"

class SmartFilter(object):
    SEARCHABLE_RELATIONSHIP = 'ansible_facts'


> /usr/lib/python2.7/site-packages/awx/main/utils/filters.py(233)query_from_string()
aqui se hace la magia de tener un filter_string, ejemplo:
u'ansible_facts__fo2=bar'

a conseguir un objecto (res) al que si hago x.result ejecuta una query sql formada correctamente.


Función que extrae el "host_filter" y genera la query sql:
2114 	    def get_queryset(self):
2115 	        qs = super(HostList, self).get_queryset()
2116 	        filter_string = self.request.query_params.get('host_filter', None)
2117 	        if filter_string:
2118 	            filter_qs = SmartFilter.query_from_string(filter_string)
2119 	            qs &= filter_qs
2120 ->	        return qs.distinct()


Si intento hacer:
variables__jo=2 me dice que no existe el lookup "jo" para TextField
Aqui ya sabe que variables



Cambiando el tipo de dato en el inventory.py de TextField a JSONBField ya funciona.

TODO:
  - que la migracion convierta los valores actuales texto yaml/json a un jsonb
  - el filtro de hosts en la vista de un inventario determinado no funciona el filtrado por ansible_facts ni variables
