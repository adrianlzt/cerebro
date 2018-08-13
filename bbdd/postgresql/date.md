http://www.postgresql.org/docs/8.0/static/functions-datetime.html

Hora en unix epoch en segundos:
SELECT ROUND(EXTRACT(EPOCH FROM now()));

Unix epoch a timestamp:
select to_timestamp(1250028000);

Filtrar por tiempo:
where created_at > (now() - INTERVAL '1 HOUR');


timestamp es el tipo de dato que almacena fecha y hora

CREATE TABLE weather (crag_id integer,date timestamp,data json,CONSTRAINT crag_id_date PRIMARY KEY(crag_id, date));
ALTER TABLE weather ALTER COLUMN date SET DEFAULT now(); // Para que por defecto se ponga la fecha actual

INSERT INTO weather(crag_id, data) VALUES(1,'{"test": "ok"}');

> SELECT * FROM weather;
 crag_id |            date            |      data
 ---------+----------------------------+----------------
        1 | 2017-08-11 15:25:24.879665 | {"test": "ok"}

