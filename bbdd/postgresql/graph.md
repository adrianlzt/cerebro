https://www.2ndquadrant.com/en/blog/creating-graph-databases-in-postgresql-follow-up/

https://register.gotowebinar.com/recording/viewRecording/8842412554362529805/3475926097586200833/adrian.lopez@datadope.io?registrantKey=2236004635851989518&type=ABSENTEEEMAILRECORDINGLINK

Se puede usar "with recursive" para hacer queries recursivas, pero es un poco jaleo
https://www.postgresqltutorial.com/postgresql-recursive-query/
https://www.postgresql.org/docs/current/queries-with.html


En al video explican como hacer una base de datos de grafos con una tabla (node,edges)

Parece que para no mucha recursion postgres funciona suficientemente bien, pero cuando empieza a ser muy profundo puede no escalar bien.


Hay una extensión para montar el lenguage "cyber" sobre postgres
https://bitnine.net/agensgraph-downloads/

Otra opción: https://github.com/apache/incubator-age



Según cuentan en el video de 2ndquadrant, postgres va a crear algunas funciones para poder navegar más sencillamente por esquemas tipo grafo.
También, la gente que crea SQL, está creando otro lenguaje para homogenizar, pero este no llegará a postgres, será para dbs específicas de grafos (se entiende que lo adoptarán neo4j, dgraph, etc)
