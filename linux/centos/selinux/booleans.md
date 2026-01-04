_Flags_ que podemos activar/desactivar para modificar la política.

# Listar booleanos

```bash
getsebool -a
```

# Modificar booleano

```bash
setsebool allow_testprog_use_network=off
```

# Usar booleanos al crear políticas

Al crear una política tendremos que declarar el booleano como:

```
bool allow_testprog_use_network true;
```

Luego activaremos un bloque solo cuando el booleano sea true. Ejemplo:

```
tunable_policy(`allow_testprog_use_network',`
 allow testprog_t self:tcp_socket create_stream_socket_perms;
 corenet_tcp_sendrecv_generic_node(testprog_t)
 corenet_tcp_bind_generic_node(testprog_t)
 allow testprog_t testprog_port_t:tcp_socket { name_bind };
')
```
