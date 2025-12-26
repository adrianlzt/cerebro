# Logging

/var/log/audit/audit.log

Nos muestra que está bloquenado (si modo enforcing o permissive) selinux.

## Buscar / ausearch

Buscar registros de denegación y pasarlos por audit2why para generar una explicación:

```bash
ausearch -m avc,user_avc -ts today | audit2why
```

Buscar los errores de un comando determinado:

```bash
ausearch -c foo
```

## Como interpretar los logs de /var/log/audit/audit.log

The process with PID 12442 (named testprog) tried to write to a file object (target) which had context (tcontext) unconfined_u:object_r:var_run_t:s0 and was called testprog.pid, with inode number 34663 on the tmpfs device (/var/run is on tmpfs). The source context (scontext) of the process was unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023.

```bash
type=AVC msg=audit(1504818384.560:460): avc:  denied  { write } for  pid=12442 comm="testprog" name="testprog.pid" dev="tmpfs" ino=34664 scontext=unconfined_u:unconfined_r:testprog_t:s0-s0:c0.c1023 tcontext=unconfined_u:object_r:var_run_t:s0 tclass=file
```

Se ha denegado el acceso del proceso httpd al fichero /var/www/html/testfile porque httpd esta en el dominio httpd_t y el fichero en el dominio samba_share_t

```bash
type=AVC msg=audit(1220706212.937:70): avc:  denied  { getattr } for  pid=1904 comm="httpd" path="/var/www/html/testfile" dev=sda5 ino=247576 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0  tclass=file
```

Se ha denegado a httpd el ponerse a escuchar en el puerto 9876

```bash
type=AVC msg=audit(1225948455.061:294): avc:  denied  { name_bind } for  pid=4997 comm="httpd" src=9876 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=system_u:object_r:port_t:s0 tclass=tcp_socket
```

Denegación a httpd de lectura al fichero /var/www/html/file1
Mirar que el SYSCALL tiene "success=no"

```bash
type=AVC msg=audit(1226882736.442:86): avc:  denied  { getattr } for  pid=2427 comm="httpd" path="/var/www/html/file1" dev=dm-0 ino=284133 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0 tclass=file

type=SYSCALL msg=audit(1226882736.442:86): arch=40000003 syscall=196 success=no exit=-13 a0=b9a1e198 a1=bfc2921c a2=54dff4 a3=2008171 items=0 ppid=2425 pid=2427 auid=502 uid=48 gid=48 euid=48 suid=48 fsuid=48 egid=48 sgid=48 fsgid=48 tty=(none) ses=4 comm="httpd" exe="/usr/sbin/httpd" subj=unconfined_u:system_r:httpd_t:s0 key=(null)
```

Mensaje de log cuando el proceso httpd esta corriendo en un dominio permisivo e intenta acceder a un fichero al que no tiene permiso.
Mirar que la traza de SYSCALL tiene "success=yes"

```bash
type=AVC msg=audit(1226882925.714:136): avc:  denied  { read } for  pid=2512 comm="httpd" name="file1" dev=dm-0 ino=284133 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0 tclass=file

type=SYSCALL msg=audit(1226882925.714:136): arch=40000003 syscall=5 success=yes exit=11 a0=b962a1e8 a1=8000 a2=0 a3=8000 items=0 ppid=2511 pid=2512 auid=502 uid=48 gid=48 euid=48 suid=48 fsuid=48 egid=48 sgid=48 fsgid=48 tty=(none) ses=4 comm="httpd" exe="/usr/sbin/httpd" subj=unconfined_u:system_r:httpd_t:s0 key=(null)
```

Buscar accesos denegados:

```bash
grep "SELinux is preventing" /var/log/messages
grep "denied" /var/log/audit/audit.log
```

# Explicación alertas / sealert

```bash
sealert -a <(tail -n 40 audit.log | grep testprog | tail -n 3)
```

Nos puede proponer como generar una política para solventar ese problema (con ausearch + audit2allow).
CUIDADO, tal vez sea demasiado genérica.
