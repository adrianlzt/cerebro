http://www.noelherrick.com/blog/inner-vs-outer-joins?utm_source=MySQL+Newsletter&utm_campaign=c925d3d306-MySQL_News_5&utm_medium=email&utm_term=0_9bd9fc13c5-c925d3d306-83407501
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


## SQL ## 

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
