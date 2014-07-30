No pone en la interfaz web un enlace para cada host y cada service.
Es útil para que apunte a una wiki donde poder apuntar cosas de ese check particular o host.

Aún mejor es apuntar a algún cgi o similar que dependiendo la información que tenga (dicho check en particular, el check ejecutado, info del host, etc) sepa que mostrar.

define service{
        name                            generic-service
        active_checks_enabled           1
...
        register                        0
        notes_url                       http://web/wiki/index.php/Monitoring-$HOSTNAME$.$SERVICEDESC$
}

