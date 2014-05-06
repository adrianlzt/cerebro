Borrado de ficheros.
Si un proceso mantiene un fichero abierto, y nosotros lo borramos (mientras el proceso continua ejecutándose), el espacio ocupado por dicho fichero no se liberará.
Hay que tener cuidado con este detalle si intentamos borrar ficheros muy grandes para liberar espacio.
La solución es truncar el fichero: echo "" > fichero

Si hubiesemos borrado el fichero.
Miramos el PID del proceso.
Lo chequeamos con lsof -p <PID>
Este nos dirá que el fichero está (deleted)

Entramos en /proc/<PID>/fd
Flusheamos el fichero borrado, apuntando al fd que toque.
Miramos cual es el problemático (son enlaces blandos): ls -la
Fluseamos cat /dev/null > /proc/<PID>/fd/<NUM>
