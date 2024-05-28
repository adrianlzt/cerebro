Con PostgreSQL 9.2 se incorporan unas cuantas funciones para guardar e interpretar JSON.
En 9.3 se incrementa este número de funciones.

https://www.postgresql.org/docs/current/static/functions-json.html
http://wiki.postgresql.org/wiki/PostgreSQL_9.3_Blog_Posts#JSON_support
http://www.postgresqltutorial.com/postgresql-json/


json vs jsonb
The data types json and jsonb, as defined by the PostgreSQL documentation,are almost identical; the key difference is that  json data is stored as an exact copy of the JSON input text, whereas jsonb stores data in a decomposed binary form; that is, not as an ASCII/UTF-8 string, but as binary code.
Por lo que veo, ciertos operadores solo se pueden aplicar sobre jsonb, por ejemplo para where, para ver si contiene una key, etc.

CREATE TABLE orders (
 ID serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);

INSERT INTO orders (info)
VALUES
(
 '{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}'
);

Seleccionar:
SELECT info->'customer' (en formato json, ejemplo: 'pepe', con las comillas)
SELECT info->>'customer' (en formato postgresql string)

to_json(valor)
to_jsonb(valor)
  convertir algo a json/jsonb

Si el campo no es tipo json, podemos hacer un cast:
info::json->'customer'

info#>>'{tabla,nth-elemento}'
  Coge el elemento n del array tabla (en formato texto)

jsonb_pretty(data#>'{software,0}')
  Muestra tabulado el primer elemento del array "software" del dicciónario "data"

tabla#>>'{1}'
Primer elemento

Convertir un array en rows:
jsonb_array_elements(data -> 'software')


Tipo de dato:
jsonb_typeof(data->'software')

Length de un array
jsonb_array_length()

JSON array a postgres array
> SELECT jsonb_array_elements_text('[{"foo": "3fo1"}, {"foo": "333"}]'::jsonb);
 jsonb_array_elements_text
---------------------------
 {"foo": "3fo1"}
 {"foo": "333"}



Extraer las claves de los json (claves de primer nivel):
create table checks(title VARCHAR(30), type varchar(30), juanson json);
insert into checks VALUES('check-http-google-8000','monitorizacion::checks::http','{"host" : "www.google.es","port" : "8000"}');
insert into checks VALUES('check-tcp-puppet-master','monitorizacion::checks::tcp','{ "host" : "192.168.51.2", "port" : "8081", "args" : "-w 3" }');
select DISTINCT json_object_keys(juanson) from checks; <- las keys sin duplicar
jsonb_object_keys para jsonb

# JSON a tabla
with data as (select event_data::jsonb from main_jobevent)
select
  q.key, q.value
from
  data d
  join jsonb_each_text(d.hosts) q on true;

Nos saca el dict de event_data como una tabla con columna keys y values




# WHERE
notes::jsonb->>'class' = 'db';

select * from main_job where extra_vars::jsonb->>'telegraf_hostname' = 'linux123';

Comprobar si tenemos una key en el json
'{"a":1, "b":2}'::jsonb ? 'b'
  este sería true


# Modificar
Ejemplo donde actualizamos el campo "variables" (tipo text, pero que contiene un json).
Lo que hacemos es modificar "ansible_host", haciéndole un append de ".com"
update main_host set variables=jsonb_set(variables::jsonb,'{ansible_host}',to_jsonb(variables::json->>'ansible_host'||'.com'),false) WHERE inventory_id=2;

La función para modificar es jsonb_set:
jsonb_set(target jsonb, path text[], new_value jsonb[, create_missing boolean])

Ejemplo de la doc:
jsonb_set('[{"f1":1,"f2":null},2,null,3]', '{0,f1}','[2,3,4]', false)   ->   [{"f1":[2,3,4],"f2":null},2,null,3]


Insertar un elemento dentro de otro
jsonb_insert(target jsonb, path text[], new_value jsonb [, insert_after boolean])

jsonb_insert('{"a": [0,1,2]}', '{a, 1}', '"new_value"')
{"a": [0, "new_value", 1, 2]}


## Borrar una key

Le "restamos" la key que queremos borrar al jsonb.
Ejemplo donde variables es un campo tipo texto que convertimos a jsonb.
```sql
select variables::jsonb - 'ansible_user' - 'ansible_password' from main_host where id =142266;
```



# Pretty print
jsonb_pretty(xxX)

Sacar un json a un fichero:
psql -XAt -d facts -c "select jsonb_pretty(data) from facts where host = 'XXX' order by timestamp desc limit 1;" > facts.json


# Generar un objeto custom
select json_build_object('hola', event) from main_jobevent ..

select
  jsonb_build_object(
    'query',
    'asd',
    'set',
    jsonb_agg(
      jsonb_build_object(
        'uid',
        'uid(Parent)',
        'depends_on',
        jsonb_build_object('uid', 'uid(Child)')
      )
    )
  );

Retorna:
{"set": [{"uid": "uid(Parent)", "depends_on": {"uid": "uid(Child)"}}], "query": "asd"}


# NULL
Si al hacer un left join estamos generando cosas tipo:
[{"foo": null}, {"bar": "123"}] podemos quitar los null con:
json_strip_nulls('[{"f1":1,"f2":null},2,null,3]')
->
[{"f1":1},2,null,3]
Quita las parejas clave-valor cuyo valor sea null
