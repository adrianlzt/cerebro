sudo pip install maybe

Lo anteponemos al programa que queramos lanzar.
Analiza las syscall que vayan a tocar ficheros y las cambia por NOOP.
Nos dice que es lo que va a hacer y nos pregunta si realmente queremos ejecutar esas opciones.

Ej.:
maybe rm /etc/hosts


# Problemas
Si primero el programa crea un fichero y luego hace cambio sobre él, al no haberse creado realmente, podrá dar problemas si intentamos, por ejemplo, intentar cambiar los permisos.

Con ansible no funciona, solo nos dice:
  create file /dev/shm/wmxsWZ
  write 32 bytes to /dev/shm/wmxsWZ
  delete /dev/shm/wmxsWZ

