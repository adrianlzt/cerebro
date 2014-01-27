Con PostgreSQL 9.2 se incorporan unas cuantas funciones para guardar e interpretar JSON.
En 9.3 se incrementa este número de funciones.

http://www.postgresql.org/docs/9.3/static/functions-json.html
http://wiki.postgresql.org/wiki/PostgreSQL_9.3_Blog_Posts#JSON_support


Extraer las claves de los json
create table checks(title VARCHAR(30), type varchar(30), juanson json);
insert into checks VALUES('check-http-google-8000','monitorizacion::checks::http','{"host" : "www.google.es","port" : "8000"}');
insert into checks VALUES('check-tcp-puppet-master','monitorizacion::checks::tcp','{ "host" : "192.168.51.2", "port" : "8081", "args" : "-w 3" }');
select DISTINCT json_object_keys(juanson) from checks; <- las keys sin duplicar


