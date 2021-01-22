http://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/sec-Defining_Audit_Rules_and_Controls.html

GUI: audit-viewer

Tiene que estar arrancado:
systemctl start auditd

lib en go: https://github.com/elastic/go-libaudit

aureport: generar informes más sencillos de leer
aureport --avc
  The aureport utility is designed to create column-based reports that show the events recorded in the audit log files.
aureport -x
  list of executable files
aureport -au -i
  full authentication report
aureport -au --summary -i --failed
  list the failed authentication events
aureport -au --summary -i --success
  summary of successful authentication events


Nos sirve para guardar registro de cualquier cambio que se produzca en nuestro sistema: ficheros, syscalls, etc
Se debe ejecutar como root.

Mostrar todas las reglas:
# auditctl -l

Vigila el fichero /etc/passwd ante lecturas(r), escrituras(w), ejecuciones(x) y atributos(a)
Le asigna la palaba "password-file", para poder luego buscar estas interacciones
# auditctl -w /etc/passwd -p rwxa -k password-file
  IMPORTANTE! Poner -w primero y luego -p
  Parece que no funciona si el fichero al que apuntamos es un link

El path debe ser absoluto.

Para buscar sucesos:
Por clave
# ausearch -i -k clave

Por comando que lo abre/ejecuta/escribe/añade
# ausearch -i -c cmd

Por fichero:
# ausearch -if /path/to/file

Si queremos que traduzca los números (por ejemplo, uid por nombre)
# ausearch -i ...

En la fecha o posterior:
# ausearch -ts "8/22/2015" "9:37:41"
-ts recent   ultimos 10 minutos
-ts $(date -d '-1 hour' +%H:%M:%S)   ultima hora

Solo mostrar los mensajes de ejeucción
ausearch -m EXECVE ...

Borrar todas las reglas (dara como resultado un 'No rules', es lo correcto)
# auditctl -D

O alguna en concreto:
-d <l,a>            Delete rule from <l>ist with <a>ction
                        l=task,exit,user,exclude
			a=never,always

O parar borrar watchers de file (-w /foo/bar), tendremos que poner los parámetros que pusismos (podemos verlo con auditctl -l)
auditctl -W /foo/bar -p wa -k foobar

Para borrar los resultados deberemos borrar los ficheros que están en /var/log/auditd/


# Parametros

-a [action,list]   (tambien se puede poner list,action)
action:
  task: cuando se crea un proceso (fork, clone)
  exit: cuando termina una syscall
  user: eventos en user space
  exlude: para excluir eventos
list:
  never: no almacenar el evento
  always: almacenar el evento

-k asignarle una key para luego buscar por ella (tambien se puede poner como -F key=nombre)

-p [r|w|x|a]  filtrar por tipo de acceso, read, write, execute, all (tambien como -F perm=x)

-S: nombre de la syscall, o número, que queremos tracear
    listado de todas las syscall: /usr/include/asm/unistd_64.h

-F: filtrar por algún campo. Por ejemplo, para la syscall kill, el campo a1 contiene que señal estamos usando (SIGKILL, etc)
    a0, a1, a2, a3 Respectively, the first 4 arguments to a syscal
    auid The original ID the user logged in with
    dir Full Path of Directory to watch. This will place a recursive watch on the directory and its whole subtree. It can only be used on exit list. See "-w".
    muchos otros campos: egid euid exit fsgid fsuid filetype gid inode key msgtype path perm pid ppid success suid uid ...

    Ejemplos:
      perm=x
      auid>=500
      auid!=-1

-w fichero    para vigilar un fichero o dir
              si estamos poniendo una syscall tendremos que hacero con -F path=xxx


# Performance
Syscall rules get evaluated for each syscall for every program. If you have 10 syscall rules, every program on your system will delay during a syscall while the audit system evaluates each rule. Too many syscall rules will hurt performance

Intentar filtrar por directorio/fichero para conseguir mayor performance (solo se evaluará la regla en caso de que matchee el fichero)

-F path=/mi/path/fichero


# Ejemplos

Analizar llamadas a un binario:
auditctl -a exit,always -F arch=b64 -F path=/usr/bin/icinga -S execve -k icinga
  Parece que no funciona si el fichero al que apuntamos es un link
ausearch -i -k icinga

Auditar kills -9
auditctl -a always,exit -F arch=b64 -S kill -F a1=9

To see files opened by a specific user:
auditctl -a always,exit -S open -F auid=510

To see unsuccessful open calls:
auditctl -a always,exit -S open -F success=0

To see if an admin is accessing other user's files:
auditctl -a always,exit -F dir=/home/ -F uid=0 -C auid!=obj_uid


  
Encontrar que proceso esta generando trafico UDP:
auditctl -a exit,always -F arch=b64 -F a0=2 -F a1=2 -S socket -k SOCKET
ausearch -i -ts today -k SOCKET



Meter reglas persistentes:
/etc/audit/rules.d/audit.rules



En las debian no viene instalado por defecto:
apt-get install auditd
service auditd start


Parece que con LXC no funciona



# Errores
The audit system is in immutable mode, no rules loaded
https://access.redhat.com/solutions/33395

Hace falta reiniciar
Suele estar configurado en la última línea de /etc/audit/audit.rules
 #5.2.18 Make the Audit Configuration Immutable (Scored)
 -e 2



# Ejemplos de reglas
/etc/audit/audit.rules
#5.2.4 Record Events That Modify Date and Time Information (Scored)
-a always,exit -F arch=b64 -S adjtimex -S settimeofday -k time-change
-a always,exit -F arch=b32 -S adjtimex -S settimeofday -S stime -k time-change
-a always,exit -F arch=b64 -S clock_settime -k time-change
-a always,exit -F arch=b32 -S clock_settime -k time-change
-w /etc/localtime -p wa -k time-change
#5.2.5 Record Events That Modify User/Group Information (Scored)
-w /etc/group -p wa -k identity
-w /etc/passwd -p wa -k identity
-w /etc/gshadow -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/security/opasswd -p wa -k identity
#5.2.6 Record Events That Modify the System's Network Environment (Scored)
-a always,exit -F arch=b64 -S sethostname -S setdomainname -k system-locale
-a always,exit -F arch=b32 -S sethostname -S setdomainname -k system-locale
-w /etc/issue -p wa -k system-locale
-w /etc/issue.net -p wa -k system-locale
-w /etc/hosts -p wa -k system-locale
-w /etc/sysconfig/network -p wa -k system-locale
#5.2.7 Record Events That Modify the System's Mandatory Access Controls (Scored)
-w /etc/selinux/ -p wa -k MAC-policy
#5.2.8 Collect Login and Logout Events (Scored)
-w /var/log/faillog -p wa -k logins
-w /var/log/lastlog -p wa -k logins
-w /var/log/tallylog -p wa -k logins
#5.2.9 Collect Session Initiation Information (Scored)
-w /var/run/utmp -p wa -k session
-w /var/log/wtmp -p wa -k session
-w /var/log/btmp -p wa -k session
#5.2.10 Collect Discretionary Access Control Permission Modification Events (Scored)
-a always,exit -F arch=b64 -S chmod -S fchmod -S fchmodat -F auid>=500 -F auid!=4294967295 -k perm_mod
-a always,exit -F arch=b32 -S chmod -S fchmod -S fchmodat -F auid>=500 -F auid!=4294967295 -k perm_mod
-a always,exit -F arch=b64 -S chown -S fchown -S fchownat -S lchown -F auid>=500 -F auid!=4294967295 -k perm_mod
-a always,exit -F arch=b32 -S chown -S fchown -S fchownat -S lchown -F auid>=500 -F auid!=4294967295 -k perm_mod
-a always,exit -F arch=b64 -S setxattr -S lsetxattr -S fsetxattr -S removexattr -S lremovexattr -S fremovexattr -F auid>=500 -F auid!=4294967295 -k perm_mod
-a always,exit -F arch=b32 -S setxattr -S lsetxattr -S fsetxattr -S removexattr -S lremovexattr -S fremovexattr -F auid>=500 -F auid!=4294967295 -k perm_mod
#5.2.11 Collect Unsuccessful Unauthorized Access Attempts to Files (Scored)
-a always,exit -F arch=b64 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EACCES -F auid>=500 -F auid!=4294967295 -k access
-a always,exit -F arch=b32 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EACCES -F auid>=500 -F auid!=4294967295 -k access
-a always,exit -F arch=b64 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EPERM -F auid>=500 -F auid!=4294967295 -k access
-a always,exit -F arch=b32 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EPERM -F auid>=500 -F auid!=4294967295 -k access
#5.2.13 Collect Successful File System Mounts (Scored)
-a always,exit -F arch=b64 -S mount -F auid>=500 -F auid!=4294967295 -k mounts
-a always,exit -F arch=b32 -S mount -F auid>=500 -F auid!=4294967295 -k mounts
#5.2.14 Collect File Deletion Events by User (Scored)
-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=500 -F auid!=4294967295 -k delete
-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=500 -F auid!=4294967295 -k delete
#5.2.15 Collect Changes to System Administration Scope (sudoers) (Scored)
-w /etc/sudoers -p wa -k scope
#5.2.16 Collect System Administrator Actions (sudolog) (Scored)
-w /var/log/sudo.log -p wa -k actions
#5.2.17 Collect Kernel Module Loading and Unloading (Scored)
-w /sbin/insmod -p x -k modules
-w /sbin/rmmod -p x -k modules
-w /sbin/modprobe -p x -k modules
-a always,exit -F arch=b64 -S init_module -S delete_module -k modules

#5.2.12 Collect Use of Privileged Commands (Scored)
find / -xdev \( -perm -4000 -o -perm -2000 \) -type f | awk '{print "-a always,exit -F path=" $1 " -F perm=x -F auid>=500 -F auid!=4294967295 -k privileged" }' >> /etc/audit/audit.rules
