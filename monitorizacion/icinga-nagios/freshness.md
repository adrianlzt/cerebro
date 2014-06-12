http://docs.icinga.org/latest/en/freshness.html

Si está activo, y no contesta durante service_freshness_check_interval o host_freshness_check_interval, se lanza el check_command.
En el check_command podemos poner un check_dummy y setearlo a WARNING o CRITICAL si queremos que salte una alarma si no ha llegado información nueva durante el periodo.

Ejemplo:
 define service{
        host_name               backup-server
        service_description     ArcServe Backup Job
        active_checks_enabled   0               ; active checks are NOT enabled
        passive_checks_enabled  1               ; passive checks are enabled (this is how results are reported)
        check_freshness         1
        freshness_threshold     93600           ; 26 hour threshold, since backups may not always finish at the same time
        check_command           no-backup-report        ; this command is run only if the service results are "stale"
        ...other options...
        }
