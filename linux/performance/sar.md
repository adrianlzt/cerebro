http://sebastien.godard.pagesperso-orange.fr
(iostat.md también forma parte de ese paquete)

Sar forma parte de un conjunto de herramientas de estadísticas para linux.

sar - Collect, report, or save system activity information.
ksar - a sar grapher (http://sourceforge.net/projects/ksar/). ~/Descargas/kSar-5.0.6/./run.sh
  packer -S ksar_bin
  /usr/bin/kSar
sargraph - http://www.sargraph.com/
http://www.sarcheck.com/ - SarCheck is a Linux & UNIX performance analysis and performance tuning tool. It is designed to help you with performance management on most Oracle Solaris, AIX, Linux, and HP-UX systems by making recommendations and explaining them with plain text, supporting graphs, and tables. Total SarCheck cost - US$9,385.00


No es un comando estandar. Necesita de un demonio para estar corriendo.
  sa1 - Collect and store binary data in the system activity daily data file
  sa2 - Write a daily report in the /var/log/sa directory
Por defecto toma un punto cada 10 minutos defindo en:
/etc/cron.d/systat
  También se define la generación de los daily summaries.

No es una herramienta costosa en principio.

Instalación:
yum install systat

/etc/default/sysstat
# Should sadc collect system activity informations? Valid values
# are "true" and "false". Please do not put other values, they
# will be overwritten by debconf!
ENABLED="false"


Configuración en RHEL: /etc/sysconfig/sysstat y /etc/sysconfig/sysstat.ioconf


Guardar estadísticas

cd /tmp/; for crap in `ls  /var/log/sa/sa* | grep -v sar`; do LC_ALL=C sar -A  -f $crap | gzip >> /tmp/$HOSTNAME.all.sar.data.$(date +%Y-%m-%d-%H:%M).txt.gz;done

Con esto generamos un fichero de texto comprimido con todas las estadísticas que tiene almacenada la máquina.
Solo queda descomprimirlo en mi portatil y abrirlo con ksar para poder ver todos los datos de forma gráfica.
Permite crear tambien nuevas gráficas personalizadas.


De un día en particular:
sar -f /var/log/sa/sa27

Y con un tiempo particular:
sar -f /var/log/sa/sa27 -s 02:20:00 -e 03:20:00


sar -A
Nos da toda la información del día de hoy
-A -> -bBdHqrRSuvwWy -I SUM -I XALL -m ALL -n ALL -u ALL -P ALL
  -b     Report I/O and transfer rate statistics.  The following values are displayed
  -B     Report paging statistics.  The following values are displayed
  -d     Report activity for each block device. Para ver la correspondencia con las particiones: lsblk
  -H     Report hugepages utilization statistics
  -I	 Report statistics for a given interrupt
  	 The  SUM keyword indicates that the total number of interrupts received per second is to be displayed
	 XALL keyword indicates that statistics from all interrupts,  including potential APIC interrupt sources
  -m	 Report power management statistics
  -n	 Report network statistics
  -q     Report queue length and load averages
  -r     Report memory utilization statistics
  -R     Report memory statistics
  -S     Report swap space utilization statistics
  -u	 Report CPU utilization
  -P	 Report per-processor statistics for the specified processor or processors
  	 ALL keyword reports statistics for each  individual  processor, and globally for all processors
  -v     Report status of inode, file and other kernel tables
  -w     Report task creation and system switching activity
  -W     Report swapping statistics
  -y     Report TTY device activity


Ejemplos:
sar -u 2 5
              Report CPU utilization for each 2 seconds. 5 lines are displayed.


CPU:
sar
  -I XALL       # interrupciones (necesita "sadc -S INT -")
  -m ALL        # power (necesita "sadc -S POWER -")
  -u            # CPU



Para obtener info de un proceso en particular
pidstat -p PID



## Leyenda ##

# Discos / iostat
http://sebastien.godard.pagesperso-orange.fr/man_iostat.html

# Sockets
http://sebastien.godard.pagesperso-orange.fr/man_sar.html
