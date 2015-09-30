https://pypi.python.org/pypi/flock/
Libreria que hace un wrapper sencillo para usar con "with x:"


Usando la librería estandar:
from fcntl import flock, LOCK_UN, LOCK_SH, LOCK_EX, LOCK_NB

f = open('/tmp/file.lock', 'w')
flock(f,LOCK_EX)
  esta llamada se quedará "colgada" hasta que se libere el lock


Si queremos gestionar un timeout:
http://stackoverflow.com/questions/5255220/fcntl-flock-how-to-implement-a-timeout


Lo más sencillo es añadir el flag LOCK_NB que en vez de quedarse colgado no devuelve
fcntl.flock(self.__lock_file.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)


# Si pondemos obtener el lock, modificamos el fichero, si no mostramos un mensaje y salimos
from fcntl import flock, LOCK_UN, LOCK_SH, LOCK_EX, LOCK_NB
with open('/tmp/file.lock', 'w') as f:
  try:
    flock(f,LOCK_EX|LOCK_NB)
    print("cambios fichero")
  except Exception as e:
    print("Fichero bloqueado")
    print(e)
  
