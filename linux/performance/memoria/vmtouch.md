https://github.com/hoytech/vmtouch/blob/master/vmtouch.pod
http://hoytech.com/vmtouch/
https://github.com/hoytech/vmtouch/
http://hoytech.github.io/vmtouch-presentation/

Portable file system cache diagnostics and control


Podemos pedirle que nos diga, de un directorio, cuantos ficheros están cargados en ram.
También puede precargar ficheros en ram.


wget https://raw.github.com/hoytech/vmtouch/master/vmtouch.c
gcc -Wall -O3 -o vmtouch vmtouch.c


Que parte de /bin esta en memoria:
vmtouch /bin/


Que parte de un fichero está en memoria (-v verbose, contra directorios saca demasiada info)
vmtouch -v fichero.txt

Cargar un fichero/directorio en memoria (vmtouch va a leer las páginas del fichero, pero el sistema podría estarlas sacando antes incluso de que termine):
Lo carga en la sección Cached
vmtouch -tv fichero.txt

Sacar un fichero de la mmemoria
vmtouch -ev fichero.txt
