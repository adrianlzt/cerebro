Típicos causantes de problemas: VACUUM, connection overhead, shared buffers




psql: FATAL:  la autentificación Ident falló para el usuario «puppet»

Estamos intentando conectar a postrgre localmente (no via TCP), y en el pg_hba.conf tendremos puesto que se mapeen los usuarios con los del sistema.
No existe usuario puppet en el sistema, y por eso falla.

Si tenemos usuario dentro de postgre, podemos hacer psql -h localhost ... y posiblemente la regla de acceso TCP sea con password md5 interna de postgre.





2015-01-18 11:51:27 UTC FATAL:  could not map anonymous shared memory: Cannot allocate memory
2015-01-18 11:51:27 UTC HINT:  This error usually means that PostgreSQL's request for a shared memory segment exceeded available memory or swap space. To reduce the request size (currently 147783680 bytes), reduce PostgreSQL's shared memory usage, perhaps by reducing shared_buffers or max_connections.
   ...fail!

Reducir en postgresql.conf
max_connections
shared_buffers
