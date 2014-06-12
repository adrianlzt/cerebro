https://github.com/adrianlzt/hiera-postgres-backend

No definir en el mismo fichero de hierarchy varias veces con la misma clave.
Ejemplo:
common.sql
  checks: "select ..."
  checks: "select ..."
Solo cogerá los resultados del último


Con el nuevo parche https://github.com/adrianlzt/hiera-postgres-backend/pull/4 tambien se puede usar con hiera_include:
hiera_include(clases)

classes: SELECT classname AS classes FROM classes WHERE node='%{::fqdn}' OR node='%{hostname}' OR node='';
