http://word.bitly.com/post/69080588278/logging-locals
Para crear un handler que nos de más información, por ejemplo las variables locales.


import logging

logger = logging.getLogger(__name__)
logging.basicConfig()
logger.setLevel(logging.DEBUG)

class ...

   logger.debug("Service %s scheduled each %s minutes" % (s[SERVICE_NAME],s[SERVICE_PERIOD])) 


# Formato
FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)

Ejemplo:
[DEBUG traza.py:21 -             <module>() ] mensaje


Definir el nivel de logger externo a una app:
import logging
logging.basicConfig(level=logging.DEBUG)
from cinderclient.v2 import client as cn_client
cinder = cn_client.Client(auth_url='https://ost-controller-lb-dev.om-d.dsn.inet:35357/v2.0',username='monit_ost',api_key='RWAeL7xXfdxi',project_id='DSM-D',service_type='volume',insecure=True,http_log_debug=True)
cinder.volumes.list()


# Varias clases, funciones
En cada una hacer:
import logging
logger = logging.getLogger("palabra")

"palabra" será una key para que todos usen el mismo logger.
Asi la conf que hagamos en un lado podrá ser usada en el otro lado.



# Generar mensajes eficientemente
logger.debug("Send keep alive for host %s", self.hostname)


logger.debug("Send keep alive for host %s" % self.hostname)
  Esta segunda opción genera la cadena y luego se la pasa al logger. Es menos eficiente en el caso de que no vaya a ser usado este nivel de debug.



# Enviar a fichero
https://docs.python.org/2.6/library/logging.html#logging.basicConfig
import logging
LOG_FILENAME = 'example.log'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG)


Tambien podemos añadirlo a posteriori:
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("openstack")
logger.debug("hola") # solo por stdout
fh = logging.FileHandler("/tmp/pepe")
logger.addHandler(fh)
logger.debug("adios") # por stdout y al fichero




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

Level	    Numeric value
CRITICAL	50
ERROR	    40
WARNING	  30
INFO	    20
DEBUG	    10
NOTSET	  0


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
