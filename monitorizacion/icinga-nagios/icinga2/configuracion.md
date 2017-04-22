Validar:
icinga2 daemon -C


# constants.conf
Es como el resource.cfg de Icinga 1. Donde se meten variables globales, como el path por defecto a los checks.

# init.conf
Donde definimos el user y group con que correrá icinga.

# icinga2.conf
include "fichero.conf"
include_resursive "conf.d" # incluir todos los ficheros del directorio conf.d/ que terminen en .conf
icinga <xx> # Hace include de /usr/share/icinga2/include/xx
include <itl> # incluye command.conf command-icinga.conf y timeperiod.conf
include <plugins> # incluye command-plugins.conf, donde estan ping4, ping6, tcp, ssl, udp, etc (los típicos de nagios-plugins)

# conf.d
Directorio donde están las configuraciones.
Por defecto tendremos unos cuantos ficheros con configuraciones de ejemplo.

La estructura que pone de ejemplo la instalacion es:
conf.d/hosts/nombrehost.conf
conf.d/hosts/nombrehost/disk.conf
conf.d/hosts/nombrehost/http.conf


# Host groups
Ejemplo en conf.d/groups.conf

Podemos crear hostgroups asociando por una variable del host. Por ejemplo:
assign where host.vars.os == "Linux"


# Host
object Host "NOMBREHOST" {
  import "generic-host" # Heredamos valores del host template 'generic-host'

  address = "127.0.0.1"
  address6 = "::1"

  # Podemos definir custom variables (como en icinga 1 con _variable)
  vars.os = "Linux"
  vars.sla = "24x7"
}


# Service
object Service "load" {
  import "generic-service"

  host_name = "localhost"
  check_command = "load"
  vars.sla = "24x7"
}

Lo suyo es asignar los services a los hosts siguiendo reglas tipo:
  assign where "linux-servers" in host.groups
  assign where "windows-servers" in host.groups
  ignore where host.address6 == ""


# Notificaciones
Primero crear un template de notificacion
template Notification "mail-service-notification" {
  command = "mail-service-notification"
  states = [ OK, Warning, Critical, Unknown ]
  types = [ Problem, Acknowledgement, Recovery, Custom,
            FlappingStart, FlappingEnd,
            DowntimeStart, DowntimeEnd, DowntimeRemoved ]
  period = "24x7"
}

Luego creamos un elemento notificacion y lo aplicamos a los hosts o services (usando el template anterior):
apply Notification "mail-icingaadmin" to Service {
  import "mail-service-notification"
  user_groups = [ "icingaadmins" ]
  assign where service.vars.sla == "24x7"
}


