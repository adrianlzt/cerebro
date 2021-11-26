https://docs.python.org/3/howto/logging-cookbook.html

http://word.bitly.com/post/69080588278/logging-locals
Para crear un handler que nos de más información, por ejemplo las variables locales.

Para loggear en JSON: https://github.com/telefonicaid/pylogops


import logging
logging.basicConfig(format='%(asctime)s %(filename)s %(levelname)s %(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)

class ...
   logger.debug("Service %s scheduled each %s minutes", s[SERVICE_NAME], s[SERVICE_PERIOD])


# Logging en varios modulos
http://eric.themoritzfamily.com/learning-python-logging.html
https://docs.python.org/2/howto/logging-cookbook.html#customized-exception-formatting
En el módulo principal, o el módulo que creemos para gestionar el logging, obtendremos y configuraremos el logger root:
root = logging.getLogger()

Las propiedades que apliquemos sobre este logger se aplicarán al resto de loggers que generemos en los módulos.
Por ejemplo, en otro módulo ponemos:
logger = logging.getLogger(__name__)

Este logger estará heredando del root logger y luego podremos especificar si queremos particularidades.

Los nombres de los loggers son jerárquicos.
Si ponemos un nombre "myapp.models.pools", estaremos heredando del root, de myapp y de models.



# Formato
FORMAT = "[%(levelname)8s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)

Ejemplo:
[CRITICAL prueba.py:18 -             <module>() ] prueba
[ WARNING prueba.py:19 -             <module>() ] prueba
[    INFO prueba.py:22 -                 pepe() ] test pepe

Con fecha:
FORMAT = "%(asctime)s %(levelname)8s %(filename)s:%(lineno)s - %(funcName)20s(): %(message)s"
logging.basicConfig(format=FORMAT, level=logging.DEBUG)
2019-11-26 14:44:52,447 CRITICAL prueba.py:18 -             <module>(): prueba



Definir el nivel de logger externo a una app:
import logging
logging.basicConfig(level=logging.DEBUG)
from cinderclient.v2 import client as cn_client
cinder = cn_client.Client(auth_url='https://ost-controller-lb-dev.om-d.dsn.inet:35357/v2.0',username='monit_ost',api_key='RWAeL7xXfdxi',project_id='DSM-D',service_type='volume',insecure=True,http_log_debug=True)
cinder.volumes.list()

# Logger con el nombre de la funcion
import sys
def funcion():
  logger.info(sys._getframe().f_code.co_name)

# Varias clases, funciones
En cada una hacer:
import logging
logger = logging.getLogger("palabra")

"palabra" será una key para que todos usen el mismo logger.
Asi la conf que hagamos en un lado podrá ser usada en el otro lado.



# Generar mensajes eficientemente
logger.debug("Send keep alive for host %s - %s", self.hostname, "test")


logger.debug("Send keep alive for host %s" % self.hostname)
  Esta segunda opción genera la cadena y luego se la pasa al logger. Es menos eficiente en el caso de que no vaya a ser usado este nivel de debug.



# Enviar a fichero
https://docs.python.org/2.6/library/logging.html#logging.basicConfig
import logging
LOG_FILENAME = 'example.log'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG)


Tambien podemos añadirlo a posteriori (mas info en la seccion de handlers):
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("openstack")
logger.debug("hola") # solo por stdout
fh = logging.FileHandler("/tmp/pepe")
logger.addHandler(fh)
logger.debug("adios") # por stdout y al fichero

Para añadir un handler que pinte por stdout/stderr
ch = logging.StreamHandler()
logger.addHandler(ch)



Handler para fichero y para console con mismo formato:
import logging
logFormatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")
rootLogger = logging.getLogger()

fileHandler = logging.FileHandler("{0}/{1}.log".format(logPath, fileName))
fileHandler.setFormatter(logFormatter)
rootLogger.addHandler(fileHandler)

consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(logFormatter)
rootLogger.addHandler(consoleHandler)





Pruebas a mano:
import logging
fh = logging.FileHandler("/tmp/pepe")
rec = logging.LogRecord("nombre","nivel","fn","lno","msg",(),None,"func")
# Mejor con Logger.makeRecord(name, lvl, fn, lno, msg, args, exc_info, func=None, extra=None)
fh.emit(rec)

fh.stream
Nos deuelve el objeto "open" del fichero abierto


# Handlers
https://docs.python.org/2.6/library/logging.html#useful-handlers

Para enviar las trazas por socket, smtp, syslog, http, etc


logger.addHandler(pepe)
logger.handlers
  lista de handlers habilitados

logger.removeHandler(logger.handlers[0])
  quitar un handler

logger.propagate = False
  deshabilitamos pasar los mensajes a los parents
  típicamente, desactivamos el logging por stdout


Ejemplo de override sobre smtp:
https://gist.github.com/anonymous/1379446


logger_http.py


Cosas que tiene un "record" por defecto, si no le aplicamos un format:
https://docs.python.org/2/library/logging.html#logrecord-attributes

dir(record)
['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'args', 'created', 'exc_info', 'exc_text', 'filename', 'funcName', 'getMessage', 'levelname', 'levelno', 'lineno', 'module', 'msecs', 'msg', 'name', 'pathname', 'process', 'processName', 'relativeCreated', 'thread', 'threadName']

record.__dict__
 {'threadName': 'MainThread', 'name': '__main__', 'thread': 140030193854208, 'created': 1445250414.871147, 'process': 15459, 'processName': 'MainProcess', 'args': (), 'module': 'traza', 'filename': 'traza.py', 'levelno': 10, 'exc_text': None, 'pathname': 'traza.py', 'lineno': 20, 'msg': 'test', 'exc_info': None, 'funcName': '<module>', 'relativeCreated': 10.263919830322266, 'levelname': 'DEBUG', 'msecs': 871.1469173431396}



# Niveles

Level    Numeric value
FATAL      50 (mejor usar critical: https://stackoverflow.com/questions/31170317/what-is-the-difference-between-logging-fatal-and-logging-critical)
CRITICAL   50
ERROR      40
WARNING    30
INFO       20
DEBUG      10
NOTSET      0

Los posibles niveles que se mostrarán por pantalla son:
CRITICAL
ERROR
WARNING
INFO
DEBUG


logger.debug("...
logger.warning("...
logger.exception -> saca error más el trace


# Parametros custom
logger.debug("test",extra={"skype":"pepito"})

El record ahora tendrá ese valor, accesible como:
record.skype


# Filtros
Se pueden aplicar a los loggers y a los handlers.

Si se aplica al logger, ni se enviará al stdout ni a los handlers.
Si se aplica a un handler, el evento se enviará a todos los handlers y el filtro decidirá si se ejecuta el handler o no.


Filtrando por un parametro extra:

class SkypeFilter(logging.Filter):
    def filter(self, record):
        try:
            return record.skype
        except AttributeError:
            return False


logger.debug("test",extra={"skype":False})
logger.debug("test2",extra={"skype":False})


# Internals
dir(logger)
['__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_log', 'addFilter', 'addHandler', 'callHandlers', 'critical', 'debug', 'disabled', 'error', 'exception', 'fatal', 'filter', 'filters', 'findCaller', 'getChild', 'getEffectiveLevel', 'handle', 'handlers', 'info', 'isEnabledFor', 'level', 'log', 'makeRecord', 'manager', 'name', 'parent', 'propagate', 'removeFilter', 'removeHandler', 'root', 'setLevel', 'warn', 'warning']



# Rotate
https://docs.python.org/2.6/library/logging.html#rotating-file-handler
https://docs.python.org/2/howto/logging-cookbook.html#using-file-rotation

log_handler = logging.handlers.RotatingFileHandler(
    cfg["log_file"], maxBytes=log_max_bytes, backupCount=4,
    # encoding='bz2')
)
formatter = logging.Formatter(
    "%(asctime)s %(filename)s %(levelname)s %(message)s",
    "%B %d %H:%M:%S")
log_handler.setFormatter(formatter)
log.addHandler(log_handler)


# Herencia
Podemos tener loggers con childs.
Se llamará al handler del child y luego a los handlers del parent.
