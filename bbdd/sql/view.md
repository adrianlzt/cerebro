https://www.w3schools.com/sql/sql_view.asp

In SQL, a view is a virtual table based on the result-set of an SQL statement.
A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.
You can add SQL functions, WHERE, and JOIN statements to a view and present the data as if the data were coming from one single table.

La vista se genera cada vez que hacemos la llamada.

CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;


En postgres tenemos las materialized views, que almacenan los datos en el momento de creación.
https://www.postgresql.org/docs/current/rules-materializedviews.html

CREATE MATERIALIZED VIEW nombre_prueba AS
select
  hosts.host,
  items.key_,
  triggers.description,
  events.eventid,
  to_timestamp(events.clock),
  acknowledges.message
from
  hosts
  join hosts_groups using(hostid)
  join groups using(groupid)
  join items using(hostid)
  join functions using (itemid)
  join triggers using(triggerid)
  join events ON (triggers.triggerid = events.objectid)
  join acknowledges using(eventid)
WHERE
  groups.name like 'technical/prod/control%jobs'
  AND events.clock > ROUND(EXTRACT(EPOCH FROM (now() - interval '2 min'))) /* solo eventos de los últimos 2 minutos */
;



Definición de una vista:
\d+ nombreVista
