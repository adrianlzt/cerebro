Los procesos de OpenStack actualizan periodicamente la BBDD mysql con la fecha actual, es la forma que tiene para saber que los procesos están activos.

Ejemplo de como lo hace el nova-compute:
servicegroup/drivers/db.py:            service.tg.add_timer(report_interval, self._report_state,
servicegroup/drivers/db.py:    def _report_state(self, service):
                               ...
                                       service.service_ref = self.conductor_api.service_update(ctxt,
                                                           service.service_ref, state_catalog)

Cada 10" (valor por defecto) se actualiza el estado usando el "conductor_api"
Si falla, se saca un mensaje de error:
2017-07-27 08:02:29.638 27072 ERROR nova.servicegroup.drivers.db [req-78d87413-606c-42a7-9411-76987e69ab59 - - - - -] model server went away

Cuando se recupere sacará otro mensaje:
2017-07-27 08:02:58.353 27072 ERROR nova.servicegroup.drivers.db [req-78d87413-606c-42a7-9411-76987e69ab59 - - - - -] Recovered model server connection!

Si entre estos dos mensajes pasan más de 60s, no se actualizará la MySQL y si ejecutamos el comando
nova-manage service list
sacará como error ese proceso que no se esta actualizando.


Las actualizaciones se envian usando OSLO/AMQP
