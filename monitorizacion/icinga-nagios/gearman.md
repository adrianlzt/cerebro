# Instalacion CentOS
https://labs.consol.de/repo/stable/#_6
rpm -Uvh "https://labs.consol.de/repo/stable/rhel6/i386/labs-consol-stable.rhel6.noarch.rpm"

yum install gearmand-server mod_gearman
chkconfig --add mod_gearman_worker
  no se mete en el chkconfig por defecto


/etc/icinga/modules/mod_gearman.cfg
define module{
  module_name     mod_gearman
  module_type     neb
  path            /usr/lib64/mod_gearman/mod_gearman.o
  args            config=/etc/mod_gearman/mod_gearman_neb.conf
}

Por defecto la configuración del neb es que no procese la perfdata
Poner perfdata_mode=1 en /etc/mod_gearman/mod_gearman_neb.conf

chgrp icinga /var/log/mod_gearman
service gearmand start
service mod_gearman_worker start
gearman_top
service icinga restart


## Instalación en Ubuntu Trusty 14.04 ##
Instalar gearman-job-server  (no equivocarse con gearman-server)


Gestor de colas.

El master gestiona unas colas donde pone tareas.
Los slaves leen de esa cola, ejecutan los comandos, y ponen la respuesta en una cola específica de respuestas.
El master lee los resultados de esa cola de respuestas.

/etc/mod_gearman/mod_gearman_neb.conf <- este fichero es el que se configura en el master
/etc/mod_gearman/mod_gearman_worker.conf <- este fichero es el que se configura en los slaves

Este software lo usamos junto con icinga para distribuir la carga de los checks.

# gearman_top -> para ver como están las colas
# gearadmin


perfdata_mode=1
Setting the value to 1 makes sure that performance data doesn't pile up endlessly in the queue when perfdata worker isn't consuming.  It's basically a precaution which prevents the queue to fill up to a point all available system memory is consumed. 


Eventhandlers
# This settings determines if all eventhandlers go into a single
# 'eventhandlers' queue or into the same queue like normal checks
# would do.
route_eventhandler_like_checks=no


Protocolo de comunicación: http://gearman.org/protocol/
Ejemplo: (echo status ; sleep 0.1) | netcat 127.0.0.1 4730

Vaciar una cola: /usr/bin/gearman -t 1000 -n -w -f function_name > /dev/null
  which basically dumps all the jobs into /dev/null


## Servicegroups ##
Si un service apunta a un host y tiene configurado un servicegroup, si este servicegroup está definido para generar una cola distinta, el service se meterá en esta cola en vez en la cola del hostgroup.



# Enviar hosts o services a un worker específico:
https://labs.consol.de/nagios/mod-gearman/#_how_to_set_queue_by_custom_variable

How to Set Queue by Custom Variable
Set queue_custom_variable=worker in your Mod-Gearman NEB configuration. Then adjust your nagios host/service configuration and add the custom variable:

  define host {
    ...
    _WORKER    hostgroup_test
  }
The test hostgroup does not have to exist, it is a virtual queue name which is used by the worker.

Adjust your Mod-Gearman worker configuration and put test in the hostgroups attribute. From then on, the worker will work on all jobs in the hostgroup_test queue.



# Proxy
Proxy Gearman Jobs from one jobserver to another jobserver. This could
be handy, when you have a worker in a remote net and only push is
allowed.

Mod-Gearman <-> Gearmand <-> Gearman-Proxy <--|--> Gearmand <-> Worker


# HA / escalabilidad
Se pueden declarar varios servers gearmans en _neb y _worker. Se usará el primero disponible

Se pueden declarar tambien varios dupserver, donde se enviarán otra vez los resultados. Useful for duplicating results for a reporting installation or remote gui.


Icinga, si tiene configurado en mod_gearman_neb varios servers, leera de todas las colas check_results de esos servidores.

Los workers, si tienen configurados varios servers, también leen de las colas de ambos servidores gearman simultaneamente.

Si tiro unos de los gearman servers todo sigue funcionando correctamente.


Varias instancias de icinga pueden usar un mismo servidor gearman modificando un parámetro para definir el nombre de la cola check_results.
