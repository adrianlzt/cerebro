http://docs.icinga.org/latest/en/passivechecks.html

In order to enable passive checks in Icinga, you'll need to do the following:
  Set accept_passive_service_checks directive is set to 1.
  Set the passive_checks_enabled directive in your host and service definitions is set to 1.
  If you want to disable processing of passive checks on a global basis, set the accept_passive_service_checks directive to 0.
  If you would like to disable passive checks for just a few hosts or services, use the passive_checks_enabled directive in the host and/or service definitions to do so.


## Mod Gearman ##
Si queremos usar mod_gearman para enviar checks pasivos:
https://labs.consol.de/nagios/mod-gearman/#_how_to_submit_passive_checks

La mejora es que interponemos un intermediario entre icinga y los hosts monitorizados.


# Passive checks para servicios
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --service="Check disk /dev/nuevo" --message="OK - debuti | size=100;200;300;0" -r=0
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --service="Check disk /dev/nuevo" --message="WARNING - cuidado | size=100;200;300;0" -r=1
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --service="Check disk /dev/nuevo" --message="CRITICAL - alerrrrta | size=100;200;300;0" -r=2
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --service="Check disk /dev/nuevo" --message="UNKNOWN - ein | size=100;200;300;0" -r=3

# Passive checks para hosts
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --message="PING OK - Packet loss = 0%, RTA = 0.49 ms|rta=0.486ms;3000;5000;0" -r=0
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host="client.com" --message="DOWN" -r=1

# Envío múltiple
send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed
client.como   check disco   0   OK - debuti | size=100;200;300;0

echo "client.com#check_proc_zombie#0#PROCS OK: 0 processes with STATE = Z" | send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed -d=#


cat <<EOF | send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed -d=#
client.com#check_proc_zombie#0#PROCS OK: 0 processes with STATE = Z
client.com#check_pmp_memory#1#WARNING Memory 35% used
client.com#check_fs_writable#0#Todo bien
EOF





# Mod Gearman + check multi #
http://www.my-plugin.de/wiki/projects/check_multi/feed_passive

Creamos la configuración de checks pasivos en el host icinga:
  define host {
          host_name                      client.com
          address                        192.168.51.3
          use                            linux-server
  }
  define service {
          host_name                      client.com
          service_description            Check_disk_dev-shm
          use                            generic-service-passive
  }
  define service {
          host_name                      client.com
          service_description            Check_disk_boot
          use                            generic-service-passive
  }

Service template para generic-service-passive
define service {
       name                            generic-service-passive
       register                        0
       use                             generic-service
       check_command                   check_dummy!0 "passive check"
       is_volatile                     1 # Si estamos en estado no-OK y llega otro no-OK, se tratará como si fuese la primera vez que pasa de OK a no-OK
       max_check_attempts              1 # Queremos que nos avise la primera vez que llegue
       passive_checks_enabled          1
       active_checks_enabled           0
       freshness_threshold             300 # A los 300" sin informacion se ejecuta el check_command
       check_freshness                 1
}


En el cliente creamos el fichero de ejecución para check_multi, test.cmd:
  command [ Check_disk_dev-shm ] = /usr/lib64/nagios/plugins/check_disk -w 10 -c 20 -p /dev/shm
  command [ Check_disk_boot ] = /usr/lib64/nagios/plugins/check_disk -w 10 -c 20 -p /boot

El nombre del command del fichero de check_multi debe ser igual que el service_description definido en el .cfg de icinga.
El nombre, restricción de check_multi, solo puede tener: A–Za-z0–9_

Para enviar los resultados al icinga:
/usr/lib/nagios/plugins/check_multi -f test.cmd -r 256 | send_multi --server=icinga --encryption=yes --key=should_be_changed --host="client.com"


## Perl ##
Cliente send_gearman en perl
https://github.com/sni/mod_gearman/blob/v1.4.14/contrib/send_gearman.pl
  Se puede compilar para windows
https://github.com/ssm/hacks/blob/master/monitor/munin-gearman-icinga/send-mod-gearman

# Python #
https://github.com/adrianlzt/python-send_gearman


# Ejecutar check y enviar con send_gearman #
CMD="/usr/lib64/nagios/plugins/check_load -c 1,1,1"; OUT=$($CMD); RET=$?; echo "send_gearman --server=127.0.0.1 --encryption=yes --key=should_be_changed --host=$(hostname) --service=$(echo $CMD | awk '{n=split ($1,a,/\//); print a[n]}') --message==\"$OUT\" -r=$RET";

La idea es meter varias lineas de esas en un fichero cron
