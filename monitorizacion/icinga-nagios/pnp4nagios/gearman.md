http://docs.pnp4nagios.org/pnp-0.6/config#gearman_mode

yum install pnp4nagios
  cuidado, instala nagios como dependencia, aunque no lo arranca ni pone como enabled

Falta el /etc/init.d/pnp_gearman_worker

Lo podemos coger del repo oficial, pero falta poner algunos parámetros:
http://sourceforge.net/p/pnp4nagios/code/ci/master/tree/scripts/rc.pnp_gearman_worker.in?format=raw

Puestas las variables, y ejecutando con el user nagios (para que pueda escribir el pid en /var/mod_gearman por defecto):
https://gist.github.com/c8588823a9536868251b

[root@controller init.d]# ./pnp_gearman_worker start
Starting pnp_gearman_worker Perl module Gearman::Worker not found

Instalar perl-Gearman-Client-1.11-1.el6.0.centos.noarch.rpm (en este directorio)


