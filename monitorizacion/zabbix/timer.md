Periódicamente coge los triggers con funciones de tiempo (nodata,date,dayofmonth,dayofweek,time,now, función "is_time_function" en misc.c) y comprueba si saltan.
En caso positivo, genera los eventos y los chequea contra las action para ver si tiene que avisar.

Todos los timer se ejecutan cada 30 segundos, todos al mismo tiempo.
Se ejecuta a :00 y :30, independientemente de cuanto tiempo pasen procesando.


process_actions (process all actions of each event in a list)
  check_action_conditions (check if actions have to be processed for the event)
    check_action_condition (check if event matches single condition)

En DCsync_functions se obtienen los triggers de la bbdd y se meten en config->time_triggers[i], seleccionando a donde va cada uno haciendo:
triggerid % CONFIG_TIMER_FORKS
Si nos devuelve un 0 será el timer #1
Por ejemplo, el triggerid 993118 será el timer 14
Es decir, hace el modulo y asigna a cada timer proc.
Esto es muy util si queremos activar el modo debug de algún timer si sabemos el triggerid.

__zbx_zbx_setproctitle
  process_time_functions (re-calculate and update values of time-driven functions)
    DCconfig_get_time_based_triggers (obtiene una lista de triggers con functiones time-based, "nodata,date,dayofmonth,dayofweek,time,now")
      hace lock de la cache
    evaluate_expressions (en el log nos pone el número de triggers a procesar, "tr_num")
      substitute_simple_macros (expandimos las macros)
        aqui podemos ver que expressions de triggers estamos procesando
        primero se itera sobre todos los triggers y se expanden sus macros
      substitute_functions (se sustituyen las funciones por sus valores)
        luego se itera por las funciones (eg.: {123}) y se las resuelve por sus valores
        zbx_extract_functionids (nos dice cuantos triggers procesa y en la salida cuantas funciones ha encontrado)
        zbx_populate_function_items
        zbx_evaluate_item_functions
          evaluate_function (nos dice que función va a evaluar)
            se llama a la funcioń epecífica (eg.: evaluate_LAST)
            zbx_vc_get_value_range para obtener el valor de la cache
              If the data is not in cache, it's read from DB, so this function
      evaluate (evaluate an expression like "(26.416>10) or (0=1)")
        luego cada trigger expandido se evalua
    SQL BEGIN
    zbx_process_triggers (calculates property changeset and generates events)
      zbx_process_trigger (por cada trigger, do not process if there are dependencies with value PROBLEM)
        DCconfig_check_trigger_dependencies (no me queda claro de donde saca los valores, en memoria?)
          LOCK CACHE
          DCconfig_check_trigger_dependencies_rec
          UNLOCK CACHE
    SQL END


Siguiendo un trigger nodata en los logs de debug veo:
In substitute_simple_macros() data:'{2020884}=1'
zbx_substitute_functions_results() expression[89]:'{2020884}=1' => '1=1'
In zbx_process_trigger() triggerid:993118 value:1(0) new_value:1
  El valor entre paréntesis es si el trigger state está normal (0), o unknown (1)
  El valor de "value" y "new value":
    0 -> trigger ok
    1 -> trigger problem
    2 -> unknown
    3 -> none
End of zbx_process_trigger():FAIL flags:0

Se generará evento si se pasa de ok->problem o viceversa (mirar la tabla para más detalle).
E(m) se refiere a que generará evento si tiene "multiple event generation"
