https://www.pgcon.org/2016/schedule/attachments/414_queues-pgcon-2016.pdf
https://blog.2ndquadrant.com/what-is-select-skip-locked-for-in-postgresql-9-5/
https://www.holistics.io/blog/how-we-built-a-multi-tenant-job-queue-system-with-postgresql-ruby/

Implementar un sistema de colas con Postgres.


A partir de Postgresql 9.5 tenemos SKIP LOCKED.
Esta nueva funcionalidad nos permite que cada worker, cuando vaya a pedir un elemento de la cola, ignore los que ya estén locked por otros workers.
De esta manera los workers pueden trabajar en paralelo.


https://gist.github.com/chanks/7585810
https://news.ycombinator.com/item?id=21536698
