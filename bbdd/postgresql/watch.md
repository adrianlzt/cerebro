https://til.hashrocket.com/posts/75fa841555-watch-for-database-changes-on-postgresql

\watch 1 "select * from job_queue";

This will run the query every 1 second (you can change the second argument if you need it slower) and display the result as well as past results.


Tambien podemos hacer:
> select 1;
> \watch 1
Se podrá a hacer watch de la última query ejecutada


Errores:
\watch cannot be used with an empty query
Usar el método de primero ejecutar la query y luego el watch
