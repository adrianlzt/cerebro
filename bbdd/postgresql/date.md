https://www.postgresql.org/docs/current/functions-datetime.html

Hora en unix epoch en segundos:
SELECT ROUND(EXTRACT(EPOCH FROM now()));
  CUIDADO esto es un double, si lo queremos comparar con un int no podremos usar index, convertir a int con ::int

Unix epoch a timestamp:
select to_timestamp(1250028000);

Filtrar por tiempo:
where created_at > (now() - INTERVAL '1 HOUR');

NO usar cosas tipo:
WHERE EXTRACT(YEAR FROM date_column) = 2017
No nos permitiría usar un índice en date_column. Mejor usar rangos: date_column >= DATE'2017-01-01' AND date_column <  DATE'2018-01-01'


timestamp es el tipo de dato que almacena fecha y hora
CUIDADO sin comparamos contra NULL un timestamp, siempre devolverá NULL si alguno es NULL.

CREATE TABLE weather (crag_id integer,date timestamp,data json,CONSTRAINT crag_id_date PRIMARY KEY(crag_id, date));
ALTER TABLE weather ALTER COLUMN date SET DEFAULT now(); // Para que por defecto se ponga la fecha actual

INSERT INTO weather(crag_id, data) VALUES(1,'{"test": "ok"}');

> SELECT * FROM weather;
 crag_id |            date            |      data
 ---------+----------------------------+----------------
        1 | 2017-08-11 15:25:24.879665 | {"test": "ok"}



zabbix-server=# select extract(day from now());
 date_part
-----------
        22


Fecha actual en un formato
select to_char(current_timestamp, 'YYYY_MM_DD');


Crear timestamp:
make_timestamp(year int, month int, day int, hour int, min int, sec double precision)o
'2012-04-01 23:55:00'::timestamp
'2019-03-13 16:39:12+01'::timestamptz

Agrupar en buckets de tiempo:
select count(*),date from history_log,(select generate_series('2018-11-22 07:30:00+01'::timestamp, '2018-11-22 07:40:00+01', '1 min') as date) as d where to_timestamp(clock) between date and date + (interval '1m') group by date order by date;


Interval a segundos
EXTRACT(EPOCH FROM interval_value)
