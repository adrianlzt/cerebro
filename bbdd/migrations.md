http://www.brunton-spall.co.uk/post/2014/05/06/database-migrations-done-right/

You should never tie database migrations to application deploys or vice versa.

Every change you make must be backward compatible with the rest of the system



https://blog.philipphauer.de/databases-challenge-continuous-delivery/
It’s easy without high availability constraints: Shutdown application, update database, deploy new application, restart application
It’s hard when high availability is required: Multiple intermediate versions of the application and update application instances step by step


https://pythonspeed.com/articles/schema-migrations-server-startup/
Aqui exponen problemas de poner la migración cuando arranca el server.
Propone separar las migraciones de las actualizaciones de código.
