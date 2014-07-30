https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/mls.html


## Conceptos ##

Objects: Files, including directories and devices, are referred
Subjects: Processes, such as a user running a command or the Mozilla Firefox application

Se establecen unos niveles de seguridad, por ejemplo:
Top Secret
Secret
Confidential
Unclassified

Un proceso que por ejemplo sea Secret podrá leer Secret y niveles inferiores.
Podrá tambien escribir en Secret y Top Secret.

La idea es que conseguido un nivel se puede leer los niveles inferiores, pero no escribir en ellos (como aplicación "Secret" no debes dejar tu información en niveles poco seguros).
Y podrá escribir en su nivel y superiores (escribir en un nivel superior es dar más seguridad, pero luego no podrá leerlo)


## Instalación ##

Cuidado! No usar en sistemas con X-Window

yum install selinux-policy-mls

No activar el enforcing de golpe por que dejarán de funcionar muchas cosas.
Poner en permissive e ir corrigiendo viendo el log.
/etc/selinux/config
SELINUX=permissive
SELINUXTYPE=mls

Marcamos al sistema para que se reinicie relabeling todo el filesystem
touch /.autorelabel
reboot

Tras el arranque buscar
grep "SELinux is preventing" /var/log/messages
Para ver si se están bloqueando determinados procesos y corregirlo.

Tras esto cambiar a enforcing y volver a reiniciar.


## Administración ##

# Usuarios
useradd -Z user_u john
  crear user john mapeado al selinux user_u

semanage login -l
  ver mapeos

semanage login --modify --seuser user_u --range s2:c100 john
  especificar rango para user_u

chcon -R -l s2:c100 /home/john
  corregir el label del home de john (si fuera necesario)


# Polyinstantiated Directories #
Para tener directorios tmp exclusivos para cada usuario.

https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/polyinstantiated-directories.html
