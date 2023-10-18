https://github.com/yandex/odyssey
Advanced multi-threaded PostgreSQL connection pooler and request router.


Nos permite atacar dinámicamente al nodo que sea réplica, usando target_session_attrs.
Pero, con unas pruebas rápidas, si ese nodo pasa a ser master, no reconfigura, y sigue enviando al mismo nodo.
Parece que no permite configurarlo en modo "prefer-standby", para que ataque al standby, pero si no está, al primario.

# Docker
Parece que no hay imagen oficial.
https://github.com/yandex/odyssey/issues/29

Tienen un dockerfile, pero para hacer el build
https://github.com/yandex/odyssey/blob/master/docker/Dockerfile
