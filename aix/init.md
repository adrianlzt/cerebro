# system V rc dir
https://www.ibm.com/support/pages/starting-and-stopping-software-system-v-rc-directories

En /etc/inittab tendremos llamadas por cada run level (aunque AIX solo soporta el run level 2) llamando a /etc/rc.d/rc
Este script se encargará de ejecutar los scripts que se encuentren en /etc/rc.d/rc<runlevel>.d
Ejecutando con "stop" los scripts que empiezen por "K".
Ejecutando después con "start" los scripts que empiezen por "S".

Un esquema típico será poner el script en /etc/rc.d/init.d/ y poner un link con el nombre SNNscript en /etc/rc.d/rc2.d (usando NN para definir el orden dentro de los scripts que allí tengamos)


# initab
https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/filesreference/inittab.html

AIX usa /etc/inittab para la configuración de los programas en el arranque.
Desde ahí también se llama a los scripts en /etc/rc.d/rcN.d/ por compatibilidad son SysV

Parece que no hay manera de controlar estos procesos. AIX solo se encarga de arrancarlos/rearrancarlos/pararlos, pero no podemos mandar un reset o parar uno concreto.

El command que pasemos se pasará a "sh -c 'COMMAND'"


## lsitab
https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.cmds3/lsitab.htm
Para comprobar que programas están marcados para arrancar:
lsitab -a

O para uno en concreto:
lsitab nombre


## mkitab
https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.cmds3/mkitab.htm
Para meter entradas en el arranque
mkitab [ -i Identifier ] { [ Identifier ] : [ RunLevel ] : [ Action ] : [ Command ] }

Ejemplo:
mkitab "zabbix:2:once:/opt/freeware/sbin/zabbix_agentd --config /etc/zabbix/zabbix_agentd.conf"

Esto mete en el inittab una entrada con identificador=zabbix, para el runlevel 2 (Contains all of the terminal processes and daemons that are run in the multiuser environment)
Action once: When the init command enters the run level specified for this record, start the process, do not wait for it to stop and when it does stop do not restart the process. If the system enters a new run level while the process is running, the process is not restarted.
Y el comando a ejecutar.


## chitab
https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.cmds1/chitab.htm
Modificar entradas


## rmitab
https://www.ibm.com/support/knowledgecenter/ssw_aix_71/com.ibm.aix.cmds4/rmitab.htm
Eliminar entradas


## tellnit / init
https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.cmds5/telinit.htm
Para cambiar el run level del sistema


