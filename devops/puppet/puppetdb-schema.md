catalogs
select * from catalogs order by id;
  Para cada nodo nos dice el id del catalog y cuando ha sido su última compilación.

catalog_resources
  Para cada catalog, nos muestra los recursos que se han generado (tipo de recurso, fichero de donde sale, linea, tags)

certname_facts
  Facts enviadas por cada nodo

certname_facts_metadata
select c.certname,c.timestamp,e.name from certname_facts_metadata AS c, environments AS e where c.environment_id=e.id;
  Nos dice el entorno (--environment) al que pertenece cada nodo

certnames
  Lista de nodos. Si hemos hecho puppet node deactivate nos aparecerá la fecha de ejecucción de dicho comando.

Edges
  Muestra las relaciones entre los recursos de puppet.
  Los "types" pueden ser: 
    required-by
    notifies
    subscription-of
    contains
    before

  Para consultar cual es cada recurso:
  select * from catalog_resources where resource='02eedf3d0c02cba430c3e9b147a69d9fa5d15c60' order by catalog_id DESC limit 1;

reports
  vacía

resource_events
  vacía

resource_params
  Tabla con los parámetros asociados a cada recurso

resource_params_cache
  Para un recurso de cachea un json con los valores. Es como resource_params pero tenemos un json con los valores en vez de varias entradas de la base de datos.
  Esta es la tabla que usa realmente puppet. Cada cierto tiempo se regenera a partir de resource_params



Como buscar un recurso exportado:
1.- Buscamos como se llama en la tabla certnames
  SELECT name FROM certnames WHERE name LIKE '%nodo%';

2.- Obtenemos el id del último catalog del nodo:
  SELECT id FROM catalogs WHERE certname='nodo1.com';  

3.- Obtenemos los recursos de nodo:
  SELECT type,title,exported,resource FROM catalog_resources WHERE catalog_id=2;

4.- Buscamos algun recurso en particular:
  SELECT type,title,exported,resource FROM catalog_resources WHERE catalog_id=2 AND type LIKE '%Monit%';

5.- Obtenemos los parámetros de ese recurso
  SELECT * FROM resource_params WHERE resource='381f93050bb6b06b434f72e309c0e3b6f4d00e16';

  Cacheados: SELECT * FROM resource_params_cache WHERE resource='381f93050bb6b06b434f72e309c0e3b6f4d00e16';


Si queremos modificar un parámetro lo haremos en el resource_params y en el resource_params_cache:
UPDATE resource_params SET value='"1.3.7.9"' WHERE resource='381f93050bb6b06b434f72e309c0e3b6f4d00e16' AND name='address';
UPDATE resource_params_cache SET parameters='{...,"address":"1.3.7.9"}' WHERE resource='381f93050bb6b06b434f72e309c0e3b6f4d00e16';


Si queremos crear un elemento primero lo haremos en el resource_params_cache y luego en catalog_resources.
Ejemplo:

INSERT INTO resource_params_cache VALUES(
encode(digest('Monitorizacion::Icinga::Host xmen_ciclope.com', 'sha1'), 'hex'),
'{"address":"111.11.1.2","host_name":"xmen_ciclope.com","nagiosalias":"xmen_ciclope.com","hostgroups":"xmen","project":"xmen","tag":"icinga-dev-vagrant"}');


# Crear host
INSERT INTO catalog_resources VALUES(
5,
encode(digest('Monitorizacion::Icinga::Host xmen_ciclope.com', 'sha1'), 'hex'),
'Monitorizacion::Icinga::Host',
'xmen_ciclope.com',
'{icinga-dev-vagrant,monitorizacion,host,class,monitorizacion::basic,monitorizacion::icinga::host,xmen_ciclope.com,icinga,basic}',
't',
'/var/lib/puppet/initiatives/dsn_dev/modules/monitorizacion/manifests/basic.pp'
,64);

