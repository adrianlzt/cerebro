# Administración

Configuración: /etc/selinux/

Definición de contextos: /etc/selinux/targeted/contexts/files/

## Estado

Estado de selinux
Deberemos tener el modo a Enforcing y el policy a targeted (es lo "normal")

```bash
sestatus
```

```bash
getenforce
```

Nos dice como esta configurado actualmente
Enforcing -> activado
Permissive -> no activado

Para desactivarlo (no sobrevive a un reinicio)

```bash
setenforce 0
```

Para desactivarlo permanentemente
En version >=7:

```bash
/etc/selinux/config
SELINUX=enforcing
```

Activarlo:
CUIDADO!
Si activamos selinux deberemos reiniciar el sistema para que se haga un relabel de todo el filesystem, ya que en modo permissive o disabled los nuevos ficheros no se les ponen etiquetas (label) y/o pueden tener labels incorectas seteadas por algún usuario.
Puede tardar unos 10minutos, depende de la cantidad de ficheros.

```bash
reboot
```

## Ficheros

Roles do not have a meaning for files

Info:

```bash
ls -Z file
```

Cambiar type (chcon = change context) (no sobrevive a un 'file system relabel'):

```bash
chcon -t TYPE FICHERO
  -R: recursive
```

Cambiar usuario:

```bash
chcon -u unconfined_u /etc/fichero
```

```bash
matchpathcon -V FICHERO/DIR
comprobar que tiene los permisos por defecto
```

Mostrar reglas:

```bash
semanage fcontext -l
```

Cambiar de forma permanente (guarda en /etc/selinux/targeted/contexts/files/file_contexts.local)
Usar siempre un PATH abosluto!

```bash
semanage fcontext -a -t TYPE FICHERO/DIR/REGEX
```

Ejemplo:
  semanage fcontext -a -t samba_share_t /etc/file1
  semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
    habilita que httpd lea el contenido de /web/*

Borrar regla permanente:
semanage fcontext -d FICHERO/DIR/REGEX

Restaurar type al original:
restorecon -v FICHERO
  -v: show changes
Los valores que deben ponerse se consultan en /etc/selinux/targeted/contexts/files

## Procesos

Info, mostrando las labels de selinux, el contexto donde corre el proceso.

```bash
ps -eZ
ps -eZ f
```

Un proceso desconocido ejecutado desde la shell por defecto ira al contexto "unconfined_u:unconfined_r:unconfined_t", no viéndose limitado por selinux.

Si lo ejecutamos desde systemd en cambio usará el contexto "system_u:system_r:unconfined_service_t".

Los procesos heredarán el contexto del proceso que lo ejecutó, excepto si alguna regla dice lo contrario.

## Usuarios

Mirar user.md

Mapeo entre usuarios del sistema y de selinux:

```bash
semanage login -l
```

__default__ es donde se mapean los usuarios por defecto

The last column, MLS/MCS Range, is the level used by Multi-Level Security (MLS) and Multi-Category Security (MCS).

Contexto selinux de mi usuario:

```bash
id -Z
```

Crear usuario mapeado a un usuario de selinux

```bash
useradd -Z user_u useruuser
```

Mapear a selinux un usuario existente

```bash
semanage login -a -s user_u newuser
```

Modificar el mapeo

```bash
semanage login -m -S targeted -s "user_u" -r s0 __default__
```

# Boolean

Nos puede servir para cambiar políticas sin tener que modificarlas.
Buscaremos con grep a ver si hay alguna que cumpla nuestra necesidad.
getsetbool -a | grep ftp

Listar opciones disponibles:
semanage boolean -l

Obtener el valor:
getsebool -a
getsebool allow_console_login
getsebool allow_console_login allow_cvs_read_shadow allow_daemons_dump_core

Definir valor
setsebool httpd_can_network_connect_db on
setsebool -P httpd_can_network_connect_db off
  -P: persistente entre reinicios

setsebool -P allow_guest_exec_content on
To allow Linux users in the guest_t domain to execute applications in their home directories and /tmp/

setsebool -P allow_user_exec_content off
To prevent Linux users in the user_t domain from executing applications in their home directories and /tmp/

# Puertos

Las políticas también restringuen en que puertos puede correr cada servicio:

```bash
semanage port -l | grep http
```

Agregar el puerto 9876 para que pueda escuchar httpd:
semanage port -a -t http_port_t -p tcp 9876
  The semanage port -a command adds an entry to the /etc/selinux/targeted/modules/active/ports.local file

# Montar sistemas de ficheros

```bash
mount -o context=SELinux_user:role:type:level
```

Ejemplo: montar NFS que pueda leerlo apache
mount server:/export /local/mount/point -o context="system_u:object_r:httpd_sys_content_t:s0"

En estos FS no se podrán hacer cambios de contexto a los ficheros/directorios.

Definir un contexto por defecto para unlabeled files:
-o defcontext="system_u:object_r:samba_share_t:s0"
  los ficheros creados en esta partición recordarán sus labels entre montajes.

Para hacer multiples montajes de un mismo NFS export:
mount server:/export/web /local/web -o nosharecache,context="system_u:object_r:httpd_sys_content_t:s0"
mount server:/export/database /local/database -o \ nosharecache,context="system_u:object_r:mysqld_db_t:s0"

Para el fstab:
server:/export /local/mount/ nfs context="system_u:object_r:httpd_sys_content_t:s0" 0 0

# Evolucionando reglas - audit2allow

<https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Troubleshooting-Fixing_Problems.html>

# Dominios permisivos

Mirar permissive_domain.md

## Más información

This command provides a short output of the access vector cache statistics since boot

```bash
avcstat
```

Información sobre la política actual de selinux

```bash
seinfo
yum install setools-console
```

Dominios:

```bash
seinfo -adomain -x
```

Dominios no confinados

```bash
seinfo -aunconfined_domain_type -x
```

Dominios permisivos:

```bash
seinfo --permissive -x
```

## sesearch

Para instalarla:

```bash
yum install setools-console
```

You can use the sesearch command to search for a particular type in the policy. You can search either policy source files or the binary file

```bash
sesearch

sesearch --role_allow -t httpd_sys_content_t /etc/selinux/targeted/policy/policy.24

sesearch --allow | wc -l
# number of allow rules

sesearch --dontaudit
# don't audit rules
# opcional:
#   -s domain
```

Buscar policies cuyo source target sea `init_t` y su target type sea `unconfined_service_t`

```bash
sesearch -s init_t -t unconfined_service_t -A -ds -dt
# -A                    Search allow and allowxperm rules.
# -ds                   Match source attributes directly instead of matching member types/roles.
# -dt                   Match target attributes directly instead of matching member types/roles.
```

# Buscar errores / audit2why

Poner el modo permissive y ver que hubiese bloqueado selinux.

Lo podemos ver en el fichero:

```
/var/log/audit/audit.log
```

O ejecutando, buscar registros de denegación y pasarlos por audit2why para generar una explicación:

```bash
ausearch -m avc,user_avc -ts today | audit2why
```
