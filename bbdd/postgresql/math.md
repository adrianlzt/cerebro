# Convertir null en cero
zabbix-server=> select COALESCE(NULL,0);
 coalesce
----------
        0


COALESCE nos saca el primer valor que no sea null



# Group by avg
select item,avg(clock) from items;


# Division
Si los dos tipos de datos son int, el resultado será int.
Podemos forzar algún valor a float para que el resutlado sea float:
select count(*)::float/3 from items;

## Division by zero
Evitar con:
CASE count(column_name)
   WHEN 0 THEN 1
   ELSE count(column_name)
END



# Tipos de datos
https://www.postgresql.org/docs/current/datatype-numeric.html


# Percentil
Sacar el percentil 90% de una serie de valores.
select percentile_cont(0.9) within group (order by value) from history_uint where itemid=3405146 and  clock > 1633477208 and clock < 1633678161 ;
