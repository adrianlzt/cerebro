Proceso encargado de borrar datos antiguos.

En instalaciónes grandes siempre se deshabilita, ya que borrar datos de las tablas history* y trends* es muy costoso.
En estos casos usaremos particionado y se borrarán las particiones.

Recordar deshabilitar el housekeeper para esas tablas en este caso
Administration -> General -> Housekeeping

Se ejecutará cada n horas, definido en la config del server: HousekeepingFrequency

En la tabla "config", columnas hk_* se define la configuración para cada tipo de tabla.
Si el hk_*_mode=0, no se procesará esa tabla.

Housekeeping borra estos datos:
  removing old history and trends, housekeeping_history_and_trends(now);
  removing deleted items data, housekeeping_cleanup();
    obtiene de la tabla "housekeeper" los elementos que debe borrar de las tablas history y trends
    cada vez que borramos un item, se mete en esta tabla una entrada con su itemid en "value" y una entrada por cada tabla (trends, trends_uint, history_text, history_log, history_uint, history_str y history)
       2169696 | history_log
  removing old events, housekeeping_events(now);
  removing old problems, housekeeping_problems(now);
  removing old sessions, housekeeping_sessions(now);
  removing old service alarms, housekeeping_services(now);
  removing old audit log items, housekeeping_audit(now);

