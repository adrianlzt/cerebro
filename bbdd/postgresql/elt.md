CREATE OR REPLACE FUNCTION elt(int, VARIADIC text[])
RETURNS text AS $$
  SELECT $2[$1];
$$ LANGUAGE sql;

Cuidado, los arrays en postgres comienzan por 1



Cambia el 0 por "OK", 1 por "NOT SUPPORTED", etc
> select elt(items.state,'OK','NOT SUPPORTED') as state, count(*) from items group by state;
     state     |  count
---------------+---------
 OK            | 1348631
 NOT SUPPORTED |   25560

