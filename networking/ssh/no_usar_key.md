Si no queremos usar las claves ssh que tengamos en nuestro equipo:
 ssh -o PubkeyAuthentication=no ...


Esto puede ser un conflicto si el parametro MaxAuthTries tiene un valor pequeño y nosotros bastantes claves ssh.
El cliente ssh probará todas las claves ssh, y puede que el servidor le eche antes de probar la buena o de darnos prompt para meter la pass.
