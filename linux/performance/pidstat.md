http://sebastien.godard.pagesperso-orange.fr/man_pidstat.html

Report statistics for Linux task


Para generar gráficas: https://github.com/morucci/pidstat-grapher
sudo apt-get install python-gnuplot
python pidstat-grapher.py -p PID -d /tmp
python pidstat-grapher.py -a PATTERN -d /tmp
Se mantiene ejecutándose hasta que le demos a control+c. En ese momento se generarán .png en /tmp para cpu, io y mem



pidstat -drtuw 10 >> PIDSTAT
       -d     Report I/O statistics (kernels 2.6.20 and later only).  The following values may be displayed:
       -r     Report page faults and memory utilization.
       -t     Also display statistics for threads associated with selected tasks.
       -u     Report CPU utilization.
       -w     Report task switching activity (kernels 2.6.23 and later only).  The following values may be displayed:
       -p ALL va implícito al no poner nada
       Saca valores de los procesos que su estadística no sea 0
       Al poner un 10 nos genera reportes de lo que ha pasado en esos 10 segundos de intervalo
       Si no pusiesemos nada nos generaría el reporte desde el encendido de la máquina
       Podríamos poner también al final otro número indicando cuantos reportes queremos generar

Para ubuntu, pero no para CentOS
-s     Report stack utilization.  The following values may be displayed:


- Muestra fallos de página por segundo y datos de stack para un proceso
pidstat -r -s -p PID
  %StkSize      # memoria reservada para stack (usada o no)
  %StkRef       # memoria usada para stack (referenciada por la tarea)
  %minflt/s     # minor faults/s
  %majflt/s     # major faults/s


Una variante de este programa es pydstat, escrito en python, saca los logs en formato syslog, listo para ser procesado por splunk
https://github.com/SplunkStorm/pydstat
Es un fork mejorado de https://github.com/ampledata/pydstat
En pip está la versión antigua (ampledata) https://pypi.python.org/pypi/pydstat/1.0.1

Al ejecutar pydstat nos envía la información a syslog (level DEBUG, facility local5)


Generamos: /etc/rsyslog.d/pydstat.conf
local5.debug		/var/log/pydstat.log

# touch /var/log/pydstat.log
# /etc/init.d/rsyslog restart

Para instalar pydstat, clonamos el repo git
python setup.py build
python setup.py install

También podemos usarlo sin instalarlo, mediante build/lib.linux-x86_64-2.7/pydstat/cmd.py (primero deberemos darle permisos de ejecución)

# crontab -e
*/5 * * * * /usr/local/bin/pydstat

Esto lo suyo es subirlo a splunk y analizarlo con una gráfica tipo:
source="pydstat.log" | timechart span=4m avg(RSS) by Command

/etc/logrotate.d/pydstat:
/var/log/pydstat.log { 
  daily
  minsize 5M
  rotate 7 
  compress 
  missingok 
  notifempty 
  create 640 root root
}

