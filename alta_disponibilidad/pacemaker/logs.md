Corosync escribe por defecto en /var/log/messages
Podemos distinguir varios tipos de mensajes:

[MAIN] - mensajes de carga de corosync, built-in modules, configuracion usada...
[TOTEM ] - mensajes relacionados con el paso del token para mantener una ordenación total de los mensajes
crmd - ejecutar acciones para llegar al estado ideal
pengine - calculo del estado ideal
Pacemaker:
  pcmk_startup
  pcmk
CIB (aka. Cluster Information Base).



Para tener mas información /etc/corosync/corosync.conf
logging {
        fileline: on
        to_stderr: no
        to_logfile: yes
        logfile: /var/log/cluster/corosync.log
        to_syslog: yes
        syslog_facility: daemon
        debug: on
        timestamp: on
}

Para más trazas -> debug=trace
http://linux.die.net/man/5/corosync.conf

Formato del log:
Jul 01 10:36:42 corosync [TOTEM ] totemsrp.c:3755 Delivering MCAST message with seq 73 to pending delivery queue
