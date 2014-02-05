Como escribir ficheros de init.d. Algunas reglas:

http://stackoverflow.com/questions/696839/how-do-i-write-a-bash-script-to-restart-a-process-if-it-dies


Comprobar el estado de un proceso que nos ha dejado un .pid
kill -0 `cat /var/run/docker.pid`
No es perfecto, ya que si el fichero no existe, pero el proceso está corriendo, dirá que no se está ejecutando.
Mirar /lib/lsb/init-functions -> pidofproc
