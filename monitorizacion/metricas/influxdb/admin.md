https://influxdb.com/docs/v0.9/administration/authentication_and_authorization.html

Si ejecutmos el comando "influx" entra una shell

http://localhost:8083
Pantalla donde nos pide user, pass, ddbb, host, puerto.
Solo host es obligatorio

Aqui nos permite crear Databases, query a los datos, administrar usuarios, información del cluster.


Si enviamos métricas y no existe la ddbb se crea automaticamente.

# User
CREATE USER <username> WITH PASSWORD '<password>'

## Permisos
SHOW GRANTS FOR <user_name>
GRANT [READ,WRITE,ALL] ON <database_name> TO <username>
REVOKE [READ,WRITE,ALL] ON <database_name> FROM <username>

# Database
CREATE DATABASE <name>

Crear database con una policy por defecto distinta de la DEFAULT
CREATE DATABASE [IF NOT EXISTS] <database_name> [WITH [DURATION <duration>] [REPLICATION <n>] [NAME <retention-policy-name>]]

