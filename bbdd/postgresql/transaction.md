All statements in postgres runs inside of a transaction either explicit/implicit

# Isolation levels
https://www.postgresql.org/docs/current/transaction-iso.html

Las transacciones pueden tener distintos niveles de aislamiento respecto a otras transacciones ocurriendo al mismo tiempo.
Esto viene definido por el estandar SQL.

Dependiendo que estemos haciendo, podría tener sentido cambiar el aislamiento de nuestra transacción.

Read Committed is the default isolation level in PostgreSQL



# Dry-run
Podemos ejecutar una transacción, mostrar los resultados y hacer rollback como método de chequear una expresión.

BEGIN;

UPDATE ...;

SELECT ...;

ROLLBACK;
