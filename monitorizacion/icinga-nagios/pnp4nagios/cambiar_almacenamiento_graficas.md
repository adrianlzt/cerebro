# Cambiar modo de almacenamiento de gráficas a MULTIPLE


# Si no queremos pereder los datos actuales
sudo -u icinga /bin/bash

Cambiamos umask para que los ficheros se creen con permisos 644
umask 0022

Listamos los commands para comprobar que funcione bien la búsqueda en el directorio de las gráficas
/usr/libexec/pnp4nagios/rrd_convert.pl --list_commands --cfg_dir=/etc/pnp4nagios/

Convertimos las gráficas de un command
/usr/libexec/pnp4nagios/rrd_convert.pl --check_command=check_mk-dsmc_netapp_cls_temp  --cfg_dir=/etc/pnp4nagios/



# Crear plantilla para que cada grafica se guarde en un fichero rrd distinto
Evitamos el problema de que si aparece una nueva fuente deje de funcionar

Crear plantilla
/etc/pnp4nagios/check_commands/

vim nombre-check.cfg
Usará este nombre para elegir la conf que usar

# check_command check_nrpe!check_all_local_disks
# ________0__________|             |
# ________1________________________|
#
# User ARG1
CUSTOM_TEMPLATE = 1
# Esto por si usamos nrpe, para que coja el primer parametro como nombre del check

RRD_STORAGE_TYPE = MULTIPLE


chmod 644 nombre-check.cfg


# Reiniciar icinga y worker pnp4nagios
Si reiniciamos el pnp_gearman_worker a capon nos reinicia icinga y se pierden los últimos datos

crm configure property maintenance-mode=true

service icinga stop
service pnp_gearman_worker restart
service icinga start

crm configure property maintenance-mode=false
