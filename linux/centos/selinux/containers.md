Podemos automatizar la generación de policies para contenedores usando "udica".

Instalar

```bash
dnf install udica
```

Generar la política:

```bash
podman inspect my_container_id > container.json
udica -j container.json my_policy_name
# otra opción
podman inspect my_container_id | udica my_policy_name
```

La política típica será heredar de "container" y añadir:

```
(block prueba.policy
    (blockinherit container)
    (allow process process ( capability ( chown dac_override fowner fsetid kill net_bind_service setfcap setgid setpcap setuid sys_chroot )))

)
```

Si exponemos un puerto (el 8080 en este caso):

```
(block prueba.policy
    (blockinherit container)
    (blockinherit restricted_net_container)  # <----- NUEVA
    (allow process process ( capability ( chown dac_override fowner fsetid kill net_bind_service setfcap setgid setpcap setuid sys_chroot )))

    (allow process http_cache_port_t ( tcp_socket (  name_bind ))) # <----- NUEVA
)
```

Si fuese un puerto sin etiqueta nos pondriá:

```
    (allow process unreserved_port_t ( tcp_socket (  name_bind )))
```

Si tiene definidos volumes (en el dockerfile, o al crear el contenedor con -v):

```
(block prueba.policy
    (blockinherit container)
    (allow process process ( capability ( chown dac_override fowner fsetid kill net_bind_service setfcap setgid setpcap setuid sys_chroot )))

    (allow process container_file_t ( dir ( add_name create getattr ioctl lock open read remove_name rmdir search setattr write )))
    (allow process container_file_t ( file ( append create getattr ioctl lock map open read rename setattr unlink write )))
    (allow process container_file_t ( fifo_file ( getattr read write append ioctl lock open )))
    (allow process container_file_t ( sock_file ( append getattr open read write )))
)
```

Si está motando /etc puede que nos ponga simplemente:

```
(blockinherit config_container) # si hemos puesto algo de /etc solo en read only

(blockinherit config_rw_container) # si hemos montado /etc como rw
```
