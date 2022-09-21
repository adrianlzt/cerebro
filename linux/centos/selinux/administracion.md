##################
# Administración #
##################

Contexto SELinux:
unconfined_u:object_r:user_home_t:s0
user        :role    :type       :level

Configuración: /etc/selinux/
Definición de contextos: /etc/selinux/targeted/contexts/files/



## Estado / Activar / desactivar ##

Nos dice como esta configurado actualmente
  Enforcing -> activado
  Permissive -> no activado
getenforce  

Para desactivarlo (no sobrevive a un reinicio)
setenforce 0

Para desactivarlo permanentemente
En version >=7:
/etc/selinux/config

Centos 6:
/etc/sysconfig/selinux:
SELINUX=permissive


Activarlo:
CUIDADO!
Si activamos selinux deberemos reiniciar el sistema para que se haga un relabel de todo el filesystem, ya que en modo permissive o disabled los nuevos ficheros no se les ponen etiquetas (label) y/o pueden tener labels incorectas seteadas por algún usuario.
Puede tardar unos 10minutos, depende de la cantidad de ficheros.

/etc/sysconfig/selinux:
SELINUX=enforcing

reboot


Estado de selinux
sestatus
  Deberemos tener el modo a Enforcing y el policy a targeted (es lo "normal")




## Ficheros ##
Roles do not have a meaning for files

Info:
ls -Z file

Cambiar type (chcon = change context) (no sobrevive a un 'file system relabel'):
chcon -t TYPE FICHERO
  -R: recursive

Cambiar usuario:
chcon -u unconfined_u /etc/fichero

matchpathcon -V FICHERO/DIR
comprobar que tiene los permisos por defecto

Mostrar reglas: 
semanage fcontext -l

Cambiar de forma permanente (guarda en /etc/selinux/targeted/contexts/files/file_contexts.local)
Usar siempre un PATH abosluto!
semanage fcontext -a -t TYPE FICHERO/DIR/REGEX
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




## Procesos ##
Info
ps -eZ




## Usuarios ##
Mirar user.md

Mapeo entre usuarios del sistema y de selinux:
semanage login -l
  __default__ es donde se mapean los usuarios por defecto
  The last column, MLS/MCS Range, is the level used by Multi-Level Security (MLS) and Multi-Category Security (MCS).

Contexto selinux de mi usuario:
id -Z

Crear usuario mapeado a un usuario de selinux
useradd -Z user_u useruuser

Mapear a selinux un usuario existente
semanage login -a -s user_u newuser

Modificar el mapeo
semanage login -m -S targeted -s "user_u" -r s0 __default__



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
semanage port -l | grep http

Agregar el puerto 9876 para que pueda escuchar httpd:
semanage port -a -t http_port_t -p tcp 9876
  The semanage port -a command adds an entry to the /etc/selinux/targeted/modules/active/ports.local file



# Montar sistemas de ficheros
mount -o context=SELinux_user:role:type:level

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



## Evolucionando reglas - audit2allow ##
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Troubleshooting-Fixing_Problems.html



## Dominios permisivos ##
Mirar permissive_domain.md



## Más información ##

avcstat
This command provides a short output of the access vector cache statistics since boot



seinfo
yum install setools-console
Información sobre la política actual de selinux

Dominios:
seinfo -adomain -x

Dominios no confinados
seinfo -aunconfined_domain_type -x

Dominios permisivos:
seinfo --permissive -x


sesearch
You can use the sesearch command to search for a particular type in the policy. You can search either policy source files or the binary file

sesearch --role_allow -t httpd_sys_content_t /etc/selinux/targeted/policy/policy.24

sesearch --allow | wc -l
  number of allow rules

sesearch --dontaudit
  don't audit rules
  opcional:
    -s domain
