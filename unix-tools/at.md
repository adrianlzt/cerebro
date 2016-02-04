http://www.thegeekstuff.com/2010/06/at-atq-atrm-batch-command-examples/

Comando para ejecutar tareas en hora determinada:

$ at 22:00
at> comando-a-ejecutar
at> Control+D

$ at now + 1 min

Es necesario tener el atd corriendo: /etc/init.d/atd start


'echo start_backup.sh | at midnight' starts a command at the specified time


# Consultar tareas
atq

Más detalle:
at -c <num>

# Borrar tarea
atrm <num>
