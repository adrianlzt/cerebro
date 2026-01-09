# Systemd

Para que systemd pueda arrancar nuestra aplicación necesitamos meter esta macro:

```
init_daemon_domain(testprog_t, testprog_exec_t)
```

Nuestra aplicación correrá con el contexto:

```
system_u:system_r:testprog_t:s0
```

# Terminal / consola

```
require {
        type console_device_t;
        type user_devpts_t;
        class unix_dgram_socket { create connect sendto };
        class chr_file { append read write open getattr ioctl };
        class capability sys_tty_config;
}

allow testcat_t console_device_t:chr_file { open write getattr ioctl };
allow testcat_t self:capability sys_tty_config;
allow testcat_t user_devpts_t:chr_file { append read write getattr };
```

# Puertos

Las macros que usaremos típicamente son las "corenet", definidas en /usr/share/selinux/devel/include/kernel/corenetwork.if

## Detalle de los permisos

Error que vemos:

```
type=AVC msg=audit(1767195969.846:257): avc:  denied  { create } for  pid=2355 comm="testprog-net" scontext=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 tcontext=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 tclass=tcp_socket permissive=0
```

Esto es el proceso testprog-net que intenta abrir un puerto TCP (no se especifica cual).

En la línea syscall precedente podríamos ver la llamada a "socket", pero no veremos el puerto, que se muestra al hacer bind.

Si permitimos la creación de sockets con:

```
allow testprog_t self:tcp_socket create_stream_socket_perms;
```

Ahora veríamos el siguiente error:

```
type=SYSCALL msg=audit(1767196726.581:263): arch=c000003e syscall=49 success=no exit=-13 a0=4 a1=7ffcc38d8ec0 a2=10 a3=7f1078210df0 items=0 ppid=1315 pid=2422 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts1 ses=4 comm="testprog-net" exe="/usr/bin/testprog-net" subj=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 key=(null)
type=AVC msg=audit(1767196726.581:263): avc:  denied  { name_bind } for  pid=2422 comm="testprog-net" src=10000 scontext=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 tcontext=system_u:object_r:unreserved_port_t:s0 tclass=tcp_socket permissive=0
```

Aquí si vemos que, tras crear el socket, está intentando hacer un bind al puerto 10000.

Para definir el puerto deberemos definir un _attribute_ y usar `semanage` para asociarle un valor.

```bash
semanage port -a -t testprog_port_t -p tcp 10000
```

Para más info mirar semanage.md, sección ports.

El permiso para hcer hacer el bind

```
allow testprog_t testprog_port_t:tcp_socket { name_bind };
```

Ahora se quejará con lo siguiente:

```
type=AVC msg=audit(1767197911.350:278): avc:  denied  { node_bind } for  pid=2536 comm="testprog-net" src=10000 scontext=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 tcontext=system_u:object_r:node_t:s0 tclass=tcp_socket permissive=0
```

Esto parece que se suele permitir usando la interface (<https://github.com/SELinuxProject/refpolicy/blob/6f1c252af968dbe24ff8c85ee33c08c93c6032f2/policy/modules/kernel/corenetwork.if.in#L880>):

```
corenet_tcp_bind_generic_node(testprog_t)
# que añade la regla
# allow $1 node_t:tcp_socket node_bind;
```
