https://docs.python.org/2/library/os.html

import os
os.listdir("/proc")

Array con los ficheros


Crear directorio
os.mkdir(path[,mode])

Crear como mkdir -p
os.makedirs(path)

import pathlib
pathlib.Path("/tmp/path/to/desired/directory").mkdir(parents=True, exist_ok=True)  # Python3


Unir directorios y ficheros
>>> os.path.join("/tmp","pepe","maria")
'/tmp/pepe/maria'


Directorio existe
os.path.exists('/tmp')

Fichero existe:
os.path.isfile(fname)

os.path.basename("/tmp/adsa/asdas/asdad")
'asdad'

os.access
http://www.tutorialspoint.com/python/os_access.htm
os.access("/tmp/foo.txt", os.R_OK)
  comprueba si tenemos permisos de lectura


Borrar un fichero:
os.remove("fichero")

Path donde esta el fichero .py
os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


Subir por un directorio
>>> var
'/home/skype/dsmctools-heat/deploy/envs'
>>> os.path.dirname(os.path.dirname(os.path.abspath(var)))
'/home/skype/dsmctools-heat'


>>> os.path.abspath("/tmp/")
'/tmp'


os.getpid()
current pid


HOME
from os.path import expanduser
home = expanduser("~")


# Cambiar permisos
import os
fd = open("file")
os.fchmod(fd.fileno(), 0o755)



# Path
from pathlib2 import Path
p = Path('my/path/Que/quiera')
p.exists()
p.is_file()
