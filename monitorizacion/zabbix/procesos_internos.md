Ver estado general de los procesos internos:
ps -eo args | grep zabbix_serve[r] | less


poller:
  obtiene datos de agentes pasivos
  realiza los calculated items
  ejecuta tambien los simple checks?

# Analisis logs poller (modo debug)
Para ver un ciclo del proceso podemos buscar la linea:
__zbx_zbx_setproctitle

Dentro de cada ciclo siempre sigue hace l proceso de obtener valores, procesar y volver a empezar
In get_values()
...procesa...
End of get_values


## Procesado
DCconfig_get_poller_items
  parece que es cuando recupera algún item a procesar de la cola de los items pollers
substitute_key_macros
  resuelve las macros de la key (si tiene)
