https://github.com/adrianlzt/hiera-postgres-backend

No definir en el mismo fichero de hierarchy varias veces con la misma clave.
Ejemplo:
common.sql
  checks: "select ..."
  checks: "select ..."
Solo cogerá los resultados del último
