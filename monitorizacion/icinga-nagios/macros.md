Variables que podemos usar en los ficheros de configuración definidas por Icinga:

http://docs.icinga.org/latest/en/macrolist.html

Ejemplo:
service_template.cfg
define service{
        name                            generic-service
        active_checks_enabled           1
...
        register                        0
        notes_url                       http://web/wiki/index.php/Monitoring-$HOSTNAME$.$SERVICEDESC$
}
