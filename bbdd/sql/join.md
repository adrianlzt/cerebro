https://dev.mysql.com/doc/refman/5.7/en/join.html
http://www.noelherrick.com/blog/inner-vs-outer-joins
https://www.w3schools.com/sql/sql_join.asp
  mirar el diagrama de venn, queda muy claro

Join: unir tablas por una columna común

Inner join: si no existe el campo en una de las tablas, no tendremos entrada.
Si una entrada está repetida en una de las tablas, aparecerá dos veces

Outer join: si no existe el campo en una de las tablas, aparecerán las columnas vacías
Afecta como las unamos. Si la primera tabla no tiene relación en la segunda, aparecerá la entrada con las columnas de la segunda tabla vacías.
En cambio, si la segunda tabla no tiene relación con la primera, no aparecerán las entradas.

En outer join podemos tener left o right.
  Left, campos de la tabla de la izquierda que no tengan asociado elemento en la tabla de la derecha saldrán, con el elemento de la derecha a NULL
  Right, contrario a left. Siempre salen los elementos de la tabla de la derecha, y si no tiene pareja en la izquierda sale NULL
  Full, saca los resultados de ambas tablas. Es un left+right
En inner join no tiene sentido hablar de left o right.

Si queremos excluir, haremos un outer join y meteremos un where para que tal campo sea NIL
https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/

Ejemplo que saca los números que están en una serie pero no en la otra:
select * from generate_series(1,5) g1 full outer join generate_series(4,9) g2 ON g1.g1 = g2.g2 WHERE g1.g1 IS null or g2.g2 IS null;

Sacar los elementos de la tabla 'b' que no están en 'a':
select b.id from a full outer join b ON a.id = b.id WHERE a.id IS NULL;

Con el resultado de queries:
select b.id from (select * from a) a full outer join (select * from b) b ON a.id = b.id WHERE a.id IS NULL;


## SQL ##

Si no especificamos nada "select * from t1, t2" estamos usando INNER JOIN
Si solo especificamos JOIN, estamos usando INNER JOIN

En vez escribir:
SELECT * FROM t1, t2 WHERE t1.id=t2.id
Hacer
SELECT * FROM t1 JOIN t2 ON t1.id=t2.id
Es más estandar, aunque por detrás puede que terminen haciendo lo mismo.

Más sencillo:
select * from hosts JOIN items USING (hostid) limit 10;

# Inner join
Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Inner Join Cats C
  On C.CatOwnerName = CO.Name;

También se puede escribir como:

Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO, Cats C
  On C.CatOwnerName = CO.Name;

o

Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Join Cats C
  On C.CatOwnerName = CO.Name;


# Left outer join
Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Left Outer Join Cats C
  On C.CatOwnerName = CO.Name;

o

Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Left Join Cats C
  On C.CatOwnerName = CO.Name;

SELECT h.name,tp.name AS check_period, tp2.name as notification_period
FROM 
host_templates AS h 
LEFT JOIN timeperiods AS tp 
  ON h.check_period_id = tp.id
LEFT JOIN timeperiods AS tp2 
  ON h.notification_period_id = tp2.id;



# Right outer join
# NO USARLO! La gente lee de izquierda a derecha, es liar.
Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Right Outer Join Cats C
  On C.CatOwnerName = CO.Name;

o

Select CO.Name As OwnerName ,CO.Occupation ,C.Name As CatName
  From CatOwners CO Right Join Cats C
  On C.CatOwnerName = CO.Name;
