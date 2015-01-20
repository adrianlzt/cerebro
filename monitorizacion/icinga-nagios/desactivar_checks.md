En la interfaz gráfica podemos deshabilitar la ejecución de checks activos y/o pasivos, pero si se fuerzan con "Reschedule" se ejecutarán.

Si estamos usando check_mk veremos esta traza en apache:
GET /check_mk/nagios_action.py?action=reschedule&host=NOMBREHOST&site=&service=

O si es reschedule de un service
GET /check_mk/nagios_action.py?action=reschedule&host=NOMBREHOST&site=&service=NOMBRESERVICE
