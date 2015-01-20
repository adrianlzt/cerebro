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

os.path.basename("/tmp/adsa/asdas/asdad")
'asdad'

os.access
http://www.tutorialspoint.com/python/os_access.htm
os.access("/tmp/foo.txt", os.R_OK)
  comprueba si tenemos permisos de lectura
