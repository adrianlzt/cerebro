# Para usuarios con clave
https://unix.stackexchange.com/questions/25639/how-to-automatically-record-all-your-terminal-sessions-with-script-utility
Meter al final del .bashrc
test "$(ps -ocommand= -p $PPID | awk '{print $1}')" == 'script' || (script -f $HOME/$(date +"%d-%b-%y_%H-%M-%S")_shell.log)

Para lanzar comandos tipo:
ssh host comando
parece que no funciona bien, no pilla el comando y nos abre una shell, y al intentar salir hace cosas raras.



# Para ssh key
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
