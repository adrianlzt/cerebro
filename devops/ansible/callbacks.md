http://docs.ansible.com/developing_plugins.html#callbacks
https://github.com/ansible/ansible/tree/devel/plugins/callbacks
http://jpmens.net/2012/09/11/watching-ansible-at-work-callbacks/

Por cada tarea que hace ansible podemos realizar una acción.

Aqui por ejemplo modifica el código para enviar información a un servidor de métricas (datadog) según ansible ejecuta cosas:
https://gist.github.com/alekstorm/6350729

También puede enviar emails, escribir en hipchat, enviar a un log, etc



Ejemplo en: callback_plugin.py

# Ejemplo para modificar la salida
https://gist.github.com/dmsimard/cd706de198c85a8255f6
https://github.com/n0ts/ansible-human_log <- mas nuevo
callback_plugin.py <- modificacion mia sobre el gist para mejorar algunos problemas con el stdout (para usarlo podemos renombrarlo como human_log.py)
  usar el mio


Para sacar el output de las tareas de forma más legible:


Ejemplo:

cmd: /opt/tivoli/tsm/tdpvmware/common/scripts/vmcli -f backup -T 114 --runnow

start: 2016-03-11 16:21:24.221963

end: 2016-03-11 16:23:05.543694

delta: 0:01:41.321731

stdout: #TASK 114 backup 20131008162736229



# Como hacer uno custom
En el directorio callback_plugins/ (mismo path donde este el playbook) crearemos un fichero con cualquier nombre .py
Con eso será suficiente para que pille el callback

Si queremos usar otro directorio, en ansible.cfg poner:
[defaults]
callback_plugins = callback_plugins/




En el extenderemos la clase CallbackBase:
class CallbackModule(CallbackBase):

Y definiremos las funcciones que debemos implementar, poniendo pass cuando no quermos cambiar nada, o ejecutando acciones en caso contrario:
    def on_any(self, *args, **kwargs):
        pass

    def runner_on_failed(self, host, res, ignore_errors=False):
        self.human_log(res)


Por ejemplo, para "runner_on_ok(self, host, res)", en res tendremos un dict como este:
{'_ansible_parsed': True, u'changed': True, u'end': u'2016-10-25 08:32:41.347809', '_ansible_no_log': False, u'stdout': u'ntpd (pid  1115) is running...', u'cmd': u'service ntpd status', u'start': u'2016-10-25 08:32:41.250204', u'delta': u'0:00:00.097605', u'stderr': u'', u'rc': 0, 'invocation': {'module_name': u'command', u'module_args': {u'creates': None, u'executable': None, u'_uses_shell': True, u'_raw_params': u'service ntpd status', u'removes': None, u'warn': True, u'chdir': None}}, 'stdout_lines': [u'ntpd (pid  1115) is running...'], u'warnings': [u'Consider using service module rather than running service']}

