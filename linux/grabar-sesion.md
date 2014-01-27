Grabar sesión
http://linux.byexamples.com/archives/279/record-the-terminal-session-and-replay-later/
$ script -t 2> tutorial.timing -a tutorial.session

$exit para salir.

Para reproducir la sesión:

$ scriptreplay tutorial.timing tutorial.session


Más básico:
script fichero


Terminar de grabar: Control+d
