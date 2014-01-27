Es el codigo como se describe el estado.
Estos ficheros se llaman manifest, y tiene la extension .pp

Podemos generarlos a partir de puppet resource ... > fichero.pp


Para aplicar localmente el estado de un fichero manifest
puppet apply fichero.pp
Puede que salgan un monton de warnings la primera vez que se ejecuta el comando.

Si hago un apply a un fichero .pp que es una clase, tengo que meter al final la linea "include nombreclase", si no, no se ejecutará.

Para hacer ejecucciones sin hacer cambios
puppet apply --noop fichero.pp
Mas verboso:
puppet apply --noop -v extraer.pp

Si no nos dice nada, es que está todo como se esperaba.


Generalmente hay que escribir los manifest, el "truco" de sacarlos con pupper resource no suele llegar muy lejos.


puppet apply -e "class {'nombre': var => 'valor', var2 => 'otro',}"
