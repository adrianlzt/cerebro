http://docs.icinga.org/latest/en/freshness.html

Si está activo, y no contesta durante service_freshness_check_interval o host_freshness_check_interval, se lanza el check_command.
En el check_command podemos poner un check_dummy y setearlo a WARNING o CRITICAL si queremos que salte una alarma si no ha llegado información nueva durante el periodo.

Aunque los active_checks esten disabled se ejecutará el check_command cuando el freshness lo diga. No podemos evitar por lo tanto que se ejecute el freshness cada x tiempo.

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


tiempo configurado - tiempo real en ejecutar el command
5 min - 6 min
30 sg -  1 min
1 min - 1min
1 min 5 sg - 2 min

parece que el chequeo lo hace una vez por minuto
así que tarda 1 min mínimo
y si le pilla 1 min 1 sg tarde, no lo va a ver hasta el siguiente minuto
así que el margen es de unos 65 sg


Si el freshness_threshold es 0 icinga calcula automáticamente su valor:
https://github.com/Icinga/icinga-core/blob/e96037c176aa05011115b24286b9331655e9f31d/base/checks.c#L2273

  if (temp_service->freshness_threshold == 0) {
    if (temp_service->state_type == HARD_STATE || temp_service->current_state == STATE_OK)
      freshness_threshold = (temp_service->check_interval * interval_length) + temp_service->latency + additional_freshness_latency;
    else
      freshness_threshold = (temp_service->retry_interval * interval_length) + temp_service->latency + additional_freshness_latency;
  } else
    freshness_threshold = temp_service->freshness_threshold;
