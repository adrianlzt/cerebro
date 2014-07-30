###########
# Logging # 
###########
type=AVC msg=audit(1220706212.937:70): avc:  denied  { getattr } for  pid=1904 comm="httpd" path="/var/www/html/testfile" dev=sda5 ino=247576 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0  tclass=file
  Se ha denegado el acceso del proceso httpd al fichero /var/www/html/testfile porque httpd esta en el dominio httpd_t y el fichero en el dominio samba_share_t

type=AVC msg=audit(1225948455.061:294): avc:  denied  { name_bind } for  pid=4997 comm="httpd" src=9876 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=system_u:object_r:port_t:s0 tclass=tcp_socket
  Se ha denegado a httpd el ponerse a escuchar en el puerto 9876



Denegación a httpd de lectura al fichero /var/www/html/file1
Mirar que el SYSCALL tiene "success=no"
type=AVC msg=audit(1226882736.442:86): avc:  denied  { getattr } for  pid=2427 comm="httpd" path="/var/www/html/file1" dev=dm-0 ino=284133 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0 tclass=file
  
type=SYSCALL msg=audit(1226882736.442:86): arch=40000003 syscall=196 success=no exit=-13 a0=b9a1e198 a1=bfc2921c a2=54dff4 a3=2008171 items=0 ppid=2425 pid=2427 auid=502 uid=48 gid=48 euid=48 suid=48 fsuid=48 egid=48 sgid=48 fsgid=48 tty=(none) ses=4 comm="httpd" exe="/usr/sbin/httpd" subj=unconfined_u:system_r:httpd_t:s0 key=(null)



Mensaje de log cuando el proceso httpd esta corriendo en un dominio permisivo e intenta acceder a un fichero al que no tiene permiso.
Mirar que la traza de SYSCALL tiene "success=yes"
type=AVC msg=audit(1226882925.714:136): avc:  denied  { read } for  pid=2512 comm="httpd" name="file1" dev=dm-0 ino=284133 scontext=unconfined_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:samba_share_t:s0 tclass=file
  
type=SYSCALL msg=audit(1226882925.714:136): arch=40000003 syscall=5 success=yes exit=11 a0=b962a1e8 a1=8000 a2=0 a3=8000 items=0 ppid=2511 pid=2512 auid=502 uid=48 gid=48 euid=48 suid=48 fsuid=48 egid=48 sgid=48 fsgid=48 tty=(none) ses=4 comm="httpd" exe="/usr/sbin/httpd" subj=unconfined_u:system_r:httpd_t:s0 key=(null)



Buscar accesos denegados:
grep "SELinux is preventing" /var/log/messages
grep "denied" /var/log/audit/audit.log

