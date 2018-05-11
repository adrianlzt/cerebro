http://www.postgresql.org/docs/9.3/static/functions-array.html

# select string_to_array('ftp,dns',',');
 string_to_array
 -----------------
 {ftp,dns}


Mirar si un array contiene un elemento:
SELECT * FROM elementos WHERE ARRAY['viphost'] <@ tags;
Miramos si en el array tags está el elemento 'viphost'



Miramos si el campo month coincide con alguno de los valores:
month = ANY(ARRAY['Agosto', 'Diciembre'])



Generar un array a partir de varias rows:
https://stackoverflow.com/questions/533256/concatenate-multiple-rows-in-an-array-with-sql-on-postgresql
select array_agg(count) FROM ascensions where crag_id=4709;

Para ordenar el array:
array_agg(count ORDER BY date DESC)


select (string_to_array(name,'/'))[1] from groups where groupid=14730;
