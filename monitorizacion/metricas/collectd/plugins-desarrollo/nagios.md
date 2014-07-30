https://collectd.org/documentation/manpages/collectd-exec.5.shtml#using_nagios_plugins
https://github.com/collectd/collectd/blob/master/contrib/exec-nagios.px
https://github.com/collectd/collectd/blob/master/contrib/exec-nagios.conf

Ejecutar plugins de nagios desde Collectd.


Para ejecutar exec-nagios.px hacen falta los paquetes perl :
Config::General
  Ubuntu: apt-get install libconfig-general-perl
Regexp::Common
  Ubuntu: apt-get install libregexp-common-perl

Fichero de configuracion para collectd:
<Plugin exec>
  Exec "nrpe" "/home/vagrant/exec-nagios.px"
</Plugin>

El ejecutable en Ubuntu está en /usr/share/doc/collectd-core/examples/exec-nagios.px

Poner el fichero de configuracion /usr/share/doc/collectd-core/examples/exec-nagios.conf en /etc


NRPEConfig /etc/nrpe.cfg
por si queremos leer un archivo nrpe para luego llamar a las cosas como "script comando-nrpe", en vez de "script /usr/lib..." 

Interval 300
cada cuanto tiempo se hace pooling a los checks definidos en este fichero

Si queremos testear lo que hace el exec-nagios.px podemos ejecutarlo, teniendo cuidado con las locale, porque si no no parseará bien lo resultados (no entenderá 0,9)
LC_ALL=C perl /home/vagrant/exec-nagios.px

Parchear para meter el locale dentro (mirar pull-request hecho por mi)


# Debug  #
Para ver lo que está enviando a collectd:
cat /proc/$(pgrep exec-nagios.px)/fd/1
