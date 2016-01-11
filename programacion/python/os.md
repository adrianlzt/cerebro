import os
os.listdir("/proc")

Array con los ficheros


Crear directorio
os.mkdir(path[,mode])


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
