mirar generate_series.md

select count(*),date_trunc('hour',to_timestamp(clock)) as hour,(extract (minute from to_timestamp(clock))::int / 10) as slot5 from history where clock > 1527285600 and clock < 1527307200 group by hour,slot5 order by hour;

Tenemos una tabla con un epoch en "clock".
Queremontar contar el número de ocurrencias cada 10'.

Primero convertimos a timestamp, truncamos por horas, agrupamos por esos valores y contamos;
select count(*),date_trunc('hour',to_timestamp(clock)) as hour from history where clock > 1527285600 and clock < 1527307200 group by hour order by hour;

Luego añadimos otro grupo que son los minutos divididos entre 10 para que nos queden 6 subgrupos (00-10, 10-20, etc) y hacemos una segunda agrupación por ellos, quedándo la query total

