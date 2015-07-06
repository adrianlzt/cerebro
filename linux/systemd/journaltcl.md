Almacen binario de logs

journalctl -f
  como tail -f a los syslog

journalctl --list-boots
  mostrar los arranques de la máquina

journalctl -u UNIDAD
  muestra solo los logs de una unidad
  -o verbose
    muestra toda la información, pid, priority, hostname, code, etc

Si vemos lineas truncadas podemos movernos con las flechas de izquierda y derecha


sudo journalctl --vacuum-time=04222015
Borrar ficheros más antiguos de 22/4/2015
