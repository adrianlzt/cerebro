# Instalacion

Fallo con postgresql, requiere más memoria de la disponible:
 * Starting PostgreSQL 9.3 database server
 * The PostgreSQL server failed to start. Please check the log output:
2015-01-18 11:51:27 UTC FATAL:  could not map anonymous shared memory: Cannot allocate memory
2015-01-18 11:51:27 UTC HINT:  This error usually means that PostgreSQL's request for a shared memory segment exceeded available memory or swap space. To reduce the request size (currently 147783680 bytes), reduce PostgreSQL's shared memory usage, perhaps by reducing shared_buffers or max_connections.
   ...fail!
invoke-rc.d: initscript postgresql, action "start" failed.
Mirar bbdd/postgresql/errores.md



Problema arrancando nodo para enlisting.
El cloud-init intenta contactar con el server de metadatos
Primero en la ip 169.xxxx
Luego en 192.168.1.1
Used fallback datasource

Es porque está mal la ip del region-controller. Mirar configurar.md

