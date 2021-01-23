setuid, en un ejecutable, se ejecuta con los permisos del dueño del fichero.
setgid, se ejecuta con los permisos del grupo del fichero

mirar sticky_bit.md
  es la "t" para los directorios

setgid
chmod g+s /path/to/dir
  los ficheros que se creen en ese directorio tomarán el grupo del directorio
  es 2775 es g+s 755

si vemos una 'S' es que tenemos setUID, o setGID) pero sin permisos de ejecucción.
