En docker si mapeamos aun fichero se hace a nivel de inodo.
inotify trabaja apuntando a un fichero, que apunta a ese primer inodo.

Si modificamos el fichero en el docker host, puede que cambiemos ese inodo y por lo tanto inotify no se de cuenta.

Comprobar montando un fichero con -i, mirando sus inodos (ls -i) dentro y fuera.


Workaround, montar el directorio con los fichero que queremos vigilar y usar "-r" (recurse)
