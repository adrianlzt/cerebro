Si queremos exportar/imporar la db entera, mirar https://cloud.google.com/memorystore/docs/redis/import-data


https://redis.io/commands/migrate/

Copiar datos entre redis:

Copiar del redis actual a otro que está en esa ip:puerto.
Migramos la clave "foo".
Usamos el parámetro "COPY" para no borrarlo del redis original.
Database "0".
Timeout "5000".
migrate 10.0.0.12 6379 foo 0 5000 COPY

Si la clave ya existe en el destino, el comando dará un error.
Podemos usar la opción REPLACE para pisar el valor en el destino.

Migrar todas las keys:
redis-cli --scan | xargs redis-cli MIGRATE my.redis 6379 "" 0 5000 KEYS
