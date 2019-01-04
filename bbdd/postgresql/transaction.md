# Isolation levels
https://www.postgresql.org/docs/current/transaction-iso.html

Las transacciones pueden tener distintos niveles de aislamiento respecto a otras transacciones ocurriendo al mismo tiempo.
Esto viene definido por el estandar SQL.

Dependiendo que estemos haciendo, podría tener sentido cambiar el aislamiento de nuestra transacción.

Read Committed is the default isolation level in PostgreSQL
