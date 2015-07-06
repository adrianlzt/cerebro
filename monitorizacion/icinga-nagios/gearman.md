Versiones de geramand soportadas: http://labs.consol.de/nagios/mod-gearman/#_supported_dependencies
NO usar 1.0.6, mirar en Errores.


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


# Monitorizar
Viene una herramienta con el paquete mod_gearman
/usr/bin/check_gearman

Si ponemos -c o -w estamos chequeando que no haya más de x tareas waiting.
Si usamos -C o -W estamos chequeando que no haya más de x workers
Podemos usar -q nombre para chequear una cola determinada.

/usr/bin/check_gearman -H 127.0.0.1 -q check_results -C 2
solo un icinga corriendo simultáneamente

/usr/lib64/nagios/plugins/check_tcp -H 127.0.0.1 -p 4730
/usr/lib64/nagios/plugins/check_procs -C gearmand -c 1:1
/usr/bin/check_gearman -H 127.0.0.1 -w 5 -c 20



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


# Relación con icinga
mod_gearman_neb lee de forma contínua de la cola check_results y lo va metiendo en una cola de resultados de icinga.
icinga lee cada check_result_reaper_frequency esta cola interna.
Lo que escriba mod_gearman_neb en esa cola, si icinga se reinicia antes de que el reaper haga una pasada por ahí, se pierde.



# Errores
NO usar con otra version de libgearman que no sea la 0.33

Probando con mod_gearman-1.5.2 y gearmand-1.0.6, si icinga no puede conectar con ningún servidor gearman empieza a usar todos los sockets hasta que llega al límite de file descriptors abiertos por el proceso icinga y lo mata.

Lo malo de la versión 0.33 es que si configuramos varios nodos de gearmand y uno se cae (se cae el nodo entero) deja de balancear.



mod_gearman_neb.log
2015-02-26 03:14:07][18632][ERROR] worker error: flush(Too many open files) socket -> libgearman/connection.cc:635

https://groups.google.com/forum/#!msg/gearman/nyvLh0ZhmvA/Fj1cjIAtJu8J
Parar:
mod_gearman_worker
pnp_gearman_worker
icinga
gearmand

Arrancar en orden inverso



[2015-02-27 13:14:46][6193][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
Esto se produce porque tenemos configurados en el _neb varios servidores gearman pero uno no está levantado.
Si el servidor está levantado pero con gearmand apagado no tenemos este problema.
Podemos comprobarlo bloqueando el tráfico arp en el servidor que queremos gearmand que podria estar apagado:
arptables -A IN -z 00:50:56:a2:4f:4f -j DROP



Pruebas de errores en log al dar fallos los gearmand-servers
Con mod_gearman 1.5.2
mod_gearman_neb.log

Servidor localhost configurado pero apagado:
gearmanlib 0.33:
[2015-02-27 10:31:32][2335][ERROR] sending job to gearmand failed: connect_poll(Connection refused) getsockopt() failed -> libgearman/connection.cc:104 (3 lost jobs so far)
[2015-02-27 10:33:12][2335][ERROR] sending job to gearmand failed: connect_poll(Connection refused) getsockopt() failed -> libgearman/connection.cc:104 (5 lost jobs so far)
repite periódicamente

gearmanlib 1.0.6:
[2015-02-27 10:34:39][2213][ERROR] sending job to gearmand failed: flush(GEARMAN_COULD_NOT_CONNECT) localhost:4730 -> libgearman/connection.cc:684
no vuelve a emitir mas mensajes


Servidor con una ip no existente configurado:
gearmanlib 0.33:
[2015-02-27 10:38:50][2522][ERROR] sending job to gearmand failed: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:38:50][2522][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:38:53][2522][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:38:56][2522][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
lanza periódicamente estos últimos mensajes

gearmanlib 1.0.6:
[2015-02-27 10:38:40][2307][ERROR] sending job to gearmand failed: flush(GEARMAN_COULD_NOT_CONNECT) 172.16.1.31:4730 -> libgearman/connection.cc:684
no vuelve a emitir mas mensajes


Dos servidores configurados, localhost con gearmand-server parado + ip inventada:
gearmanlib 0.33:
[2015-02-27 10:41:01][2655][ERROR] sending job to gearmand failed: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:41:04][2655][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:41:07][2655][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:41:10][2655][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
lanza periódicamente estos últimos mensajes


gearmanlib 1.0.6:
[2015-02-27 10:40:54][2413][ERROR] sending job to gearmand failed: _client_run_tasks(GEARMAN_LOST_CONNECTION) detected lost connection in _client_run_tasks() -> libgearman/client.cc:1430
no vuelve a emitir mas mensajes


Dos servidores configurados, localhost con gearmand-server corriendo + ip inventada:
gearmanlib 0.33:
[2015-02-27 10:43:51][2769][ERROR] sending job to gearmand failed: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:43:51][2769][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:43:54][2769][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
lanza periódicamente estos últimos mensajes


gearmanlib 1.0.6:
sin mensajes de error


mod_gearman_worker.log

Dos servidores configurados, localhost con gearmand-server corriendo + ip inventada:
gearmanlib 0.33:
[2015-02-27 10:45:53][2838][ERROR] worker error: connect_poll(GEARMAN_TIMEOUT) timeout occurred while trying to connect -> libgearman/connection.cc:109
[2015-02-27 10:45:53][2836][ERROR] worker error: connect_poll(GEARMAN_TIMEOUT) timeout occurred while trying to connect -> libgearman/connection.cc:109
[2015-02-27 10:45:53][2837][ERROR] worker error: connect_poll(GEARMAN_TIMEOUT) timeout occurred while trying to connect -> libgearman/connection.cc:109
[2015-02-27 10:45:55][2826][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:45:55][2835][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
[2015-02-27 10:45:55][2834][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104


gearmanlib 1.0.6:
sin mensajes de error




# Generar rpm
yum install bison rpm-build gcc-c++ libevent-devel gcc boost-devel
wget https://launchpad.net/gearmand/1.0/0.41/+download/gearmand-0.41.tar.gz
tar zxvf gearmand-0.41.tar.gz
cp gearmand-0.41/support/gearmand.init .
vi gearmand-0.41/support/gearmand.spec
en la linea 100, borrar las dos manpages
tar zcvf gearmand-0.41.tar.gz gearmand-0.41
rpmbuild -tb gearmand-0.41.tar.gz

mod_gearman
wget http://www.mod-gearman.org/download/v1.5.0/src/mod_gearman-1.5.0.tar.gz
yum install autoconf automake ncurses-devel libtool libtool-ltdl-devel perl-ExtUtils-Embed
yum install /tmp/gearmand-devel-1.0.6-1.x86_64.rpm
  instalo el gearmand-devel que he generado en el paso anterior
rpmbuild -tb mod_gearman-1.5.0.tar.gz


# Dev
https://github.com/sni/mod_gearman/blob/master/neb_module/mod_gearman.c
Llamadas que hace mod_gearman_neb

int nebmodule_init( int flags, char *args, nebmodule *handle ) {

->

  neb_register_callback( NEBCALLBACK_PROCESS_DATA, gearman_module_handle, 0, handle_process_events );
  ->
    static int handle_process_events( int event_type, void *data ) {
    ->
      register_neb_callbacks();
      ->
        static void register_neb_callbacks(void) {
        ->
          neb_register_callback( NEBCALLBACK_HOST_CHECK_DATA,    gearman_module_handle, 0, handle_host_check );
          neb_register_callback( NEBCALLBACK_SERVICE_CHECK_DATA, gearman_module_handle, 0, handle_svc_check );
          neb_register_callback( NEBCALLBACK_EVENT_HANDLER_DATA, gearman_module_handle, 0, handle_eventhandler );
          neb_register_callback( NEBCALLBACK_HOST_CHECK_DATA, gearman_module_handle, 0, handle_perfdata );
          neb_register_callback( NEBCALLBACK_SERVICE_CHECK_DATA, gearman_module_handle, 0, handle_perfdata );

      start_threads();
      -> tantas como results_workers
        pthread_create ( &result_thr[x], NULL, result_worker, (void *)&result_threads_running);
 
  neb_register_callback( NEBCALLBACK_TIMED_EVENT_DATA, gearman_module_handle, 0, handle_timed_events );

->



Del error hacia atrás:
[2015-02-27 09:06:30][10615][ERROR] worker error: connect_poll(No route to host) getsockopt() failed -> libgearman/connection.cc:104
        ret = gearman_worker_work( &worker );
        if ( ret != GEARMAN_SUCCESS && ret != GEARMAN_WORK_FAIL ) {
            if ( ret != GEARMAN_TIMEOUT)
                gm_log( GM_LOG_ERROR, "worker error: %s\n", gearman_worker_error( &worker ) );
