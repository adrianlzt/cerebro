Comando para ejecutar tareas en hora determinada:

$ at 22:00
at> comando-a-ejecutar
at> Control+D

Es necesario tener el atd corriendo: /etc/init.d/atd start


'echo start_backup.sh | at midnight' starts a command at the specified time
