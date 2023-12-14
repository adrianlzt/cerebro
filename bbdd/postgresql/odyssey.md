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


# Config

Ejemplo de config para enviar las peticiones al read-only.

En el caso de que el server read-only no esté disponible, no intentará conectar al primario.

```
listen {
        host "*"
        port 6432
        backlog 128
        compression yes
}


storage "postgres_server" {
        type "remote"
        host "[127.0.0.1]:5434,[127.0.0.1]:5435"
        target_session_attrs "read-only"
}


database "zabbix" {
        user default {
                authentication "scram-sha-256"
                password "PASSWORD_USER_ZABBIX_IN_REAL_SERVERS"
                storage "postgres_server"
                pool "session"
                pool_size 10
                client_max 50
                pool_discard no
                pool_cancel yes
                pool_rollback yes
                client_fwd_error yes
                application_name_add_host yes
        }
}
```
