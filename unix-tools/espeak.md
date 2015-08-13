espeak "hola"

Avisar cuando termina una tarea con un determinado nombre o PID:

while pgrep top; do sleep 1; done; espeak -v es "top terminado"

while test -d /proc/4325; do sleep 1; done; espeak -v es "proceso terminado"

while test -d /proc/4325; do sleep 1; done; while true; do espeak -v es "ansible terminado"; sleep 10; done
