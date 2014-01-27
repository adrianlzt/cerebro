psql: FATAL:  la autentificación Ident falló para el usuario «puppet»

Estamos intentando conectar a postrgre localmente (no via TCP), y en el pg_hba.conf tendremos puesto que se mapeen los usuarios con los del sistema.
No existe usuario puppet en el sistema, y por eso falla.

Si tenemos usuario dentro de postgre, podemos hacer psql -h localhost ... y posiblemente la regla de acceso TCP sea con password md5 interna de postgre.
