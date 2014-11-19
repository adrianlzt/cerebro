Activarlo en icinga:
process_performance_data=1

Si usamos gearman:
  un slave ejecuta el check, y si tiene activado el procesado de perfadata sube esos datos a la cola perfdata.
  hay un worker, corriendo en el nodo icinga, que se llama pnp_gearman_worker recoge esa info y la escribe en el directorio de perfdata correspondiente.

Mirar metricfactory si queremos pasar esta perfdata a otros sistemas (como graphite).


Si vemos que no se está generando perfdata, comprobar que los datos enviados cumplen la especificación.
He visto por ejemplo con check_disk cadenas truncadas (faltaban caracteres) y por eso no se generaba.

