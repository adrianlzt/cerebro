Si tenemos problemas al borrar porque está bloqueando todo lo que va a borrar mientras se ejecuta, o falla la tx por falta de espacio, podemos intentar borrar con una subselect:
https://stackoverflow.com/questions/3421226/deleting-many-rows-without-locking-them

DELETE FROM
  table
WHERE
  id IN (SELECT id FROM table WHERE key = 'needle' LIMIT 10000);
