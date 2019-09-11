Para acceder como superusuario se hace con el usuario postres:

su - postgres
psql


Recargar configuración:
pg_ctl reload



# Parada rápida
checkpoint;
Y cuando termine parar.

Así logramos que el checkpoint vaya todo lo rápido que pueda.
