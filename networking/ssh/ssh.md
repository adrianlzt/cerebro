http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html

Para que conecte más rápido:
En el servidor /etc/ssh/sshd_config:
	UseDNS no

En el cliente, meter la ip con una dirección en /etc/hosts


Para que la salida gráfica del otro pc lo veamos en el nuestro
ssh -X user@host



VPN ssh based:
man ssh -> SSH-BASED VIRTUAL PRIVATE NETWORKS

     The following example would connect client network 10.0.50.0/24 with remote network 10.0.99.0/24 using a point-to-point connection from
     10.1.1.1 to 10.1.1.2, provided that the SSH server running on the gateway to the remote network, at 192.168.1.15, allows it.

     On the client:

           # ssh -f -w 0:1 192.168.1.15 true
           # ifconfig tun0 10.1.1.1 10.1.1.2 netmask 255.255.255.252
           # route add 10.0.99.0/24 10.1.1.2

     On the server:

           # ifconfig tun1 10.1.1.2 10.1.1.1 netmask 255.255.255.252
           # route add 10.0.50.0/24 10.1.1.1



Logear comandos ssh ejecutados a través de una cuenta con clave pública: 
Del manual:
- Opcional: Generar fichero de log para registrar los accesos vía SSH con relación de confianza desde los esclavos:

[monitored_node como root]
mkdir /var/log/nagios
chown nagios:nagios /var/log/nagios

Añadir 
	command="/usr/lib64/nagios/plugins/logrcmd" 
antes de la(s) clave(s) de los esclavos en /var/spool/nagios/.ssh/authorized_keys

Ejemplo: (la línea de command tiene que ser la misma que donde esté ssh-dss o ssh-rsa)
-bash-4.1$ more .ssh/authorized_keys
command="/usr/lib64/nagios/plugins/logrcmd" ssh-dss AAAAB3NzaC1kc3MAAACBAI0P7ww8YwezX/4VGIwme8Ayn0sB/0y/K1aE/zWrzX2TPukv7SDONGxqXwzeZm/j8kIjOnd0UnZMOctXR94oBQTi6CLF7VueKAYr4c3TuxNZQU0KfSUlYUrKmgTZwyVj4KjxHx6eZ5xLurz0oFJnYkJKGOAvrdXYOm4nCo5a8ibbAAAAFQCMTv9C7tnM4B5BtpdIokxUe/3yuQAAAIBflyiWtiHUjKaI/BuYxe8U+GAPWWAYAaMuZB7UP1T2oYV+MWa/wn9P3JJtVmC/glvQm6sP+IwDSoxSDWSCKppiQxdgrqPUaKZM/L9VH+mAJc/H7x7bulEpC0YpDGh13qTAidzdN/geeJPHisTfRGRQBj07l1yxqRuPW5FFCWZVIAAAAIAQ6UFHfz8sFS62xlrJfh9qYgUKdFG5ySlm09FEuYGOUGUSX48vAWomGtoCQZ42YtQi4ToHMFazBi5RqE1V5oN1aGZ+nq3iLrfA1ZBy3SGhJnCcN36rJ2AbUlnS9CAUjSQBjvHqNhXDd4/rfEilfSeY/3fqMZmn6i0xUOHQc/vM/A== ags@NagiosSL02

Crear el fichero /usr/lib64/nagios/plugins/logrcmd con el contenido:
#!/bin/bash
LOGFILE="/var/log/nagios/nagios_rcmd.log"
TIMESTAMP=`date +"%Y/%m/%d-%H:%M:%S"`
echo "[$TIMESTAMP]: '$SSH_ORIGINAL_COMMAND'" >> $LOGFILE
eval $SSH_ORIGINAL_COMMAND

Y los permisos:
chown nagios:nagios /usr/lib64/nagios/plugins/logrcmd 
chmod u+x /usr/lib64/nagios/plugins/logrcmd

Crear script de rotado para el log en /etc/logrotate.d/nagios_rcmd con el contenido:
/var/log/nagios/nagios_rcmd.log
{
    	rotate 7
	daily
	create 0664 nagios nagios
}



Clave pública:
host-admin# ssh-keygen  (generamos clave si no la tenemos ya)
host-admin# ssh-copy-id user@host
host-admin# ssh-copy-id "user@host-client -p 6842"  (si ssh está en otro puerto)


Comprimir tráfico (para conexiones de baja velocidad)
ssh -C


~/.ssh/config
# Que no pregunte si nos fiamos el fingerprint al conectar a un server nuevo
StrictHostKeyChecking no


# Ir pasando la clave publica a las maquinas que nos conectemos
# Asi podremos conectar desde una maquina donde estemos logueados con ssh a una tercera usando la clave publica local
# Si conectamos a un host malicioso con ForwardAgent nos pueden robar la clave
# Configurar solo en ciertos nodos
# O usar "ssh -A" en los casos que lo necesitemos
ForwardAgent yes


# Evitar probar GSSAPI auth. Conexiones mas rapidas
# Quitar en los sshd si no lo usamos
GSSAPIAuthentication no


# Cambiar la encriptación usada a una más debil pero más rápida.
# Solo usar en conexiones en entornos seguros o a través de VPN
# http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html#comment-32977
Host dev
  Ciphers arcfour256
  MACs umac-64@openssh.com
