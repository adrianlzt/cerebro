https://joeyh.name/code/moreutils/discussion/

http://www.chainsawonatireswing.com/2012/04/22/how-can-you-tell-if-a-file-is-utf-8-encoded-or-not/

apt-get install moreutils
pacman -S moreutils

chronic: runs a command quietly unless it fails
combine: combine the lines in two files using boolean operations
ifdata: get network interface info without parsing ifconfig output
ifne: run a program if the standard input is not empty
isutf8: check if a file or standard input is utf-8
lckdo: execute a program with a lock held -> deprecado por flock
mispipe: pipe two commands, returning the exit status of the first
parallel: run multiple jobs at once
pee: tee standard input to pipes
sponge: soak up standard input and write to a file
ts: timestamp standard input
vidir: edit a directory in your text editor
vipe: insert a text editor into a pipe
zrun: automatically uncompress arguments to command


# chronic
https://git.joeyh.name/?p=moreutils.git;a=blob;f=chronic;h=7cfc2d69d326c71c0f71d7e97785dd01fb186ff1;hb=HEAD
raw:
curl 'https://git.joeyh.name/?p=moreutils.git;a=blob_plain;f=chronic;h=7cfc2d69d326c71c0f71d7e97785dd01fb186ff1;hb=HEAD' -o chronic
Depende de perl-IPC-Run

Implementación en bash: http://habilis.net/cronic/cronic

Solo muestra el stdout/stderr si el comando sale con RC!=0
Útil para poner como prefijo a tareas de cron

# combine
Operaciones and, or, not, xor sobre lineas de dos ficheros

# ifdata
Con distintos argumentos nos devuelve valores de la interfaz.
Por ejemplo, podemos obtener la ip de una interfaz sin tener que andar grepeando

# ifne
Corre un programa si el stdout del anterior no es vacio:

true | ifne echo "hola"
Esto no ejecutaría el echo porque true no devuelve nada

find . -name core | ifne mail -s "Core files found" root


# vidir
Nos abre en vim la lista de ficheros del path que le hayamos pasado.
Nos permite borrar o renombrar los ficheros

vidir *.jpeg
    Typical uses.

find | vidir -
    Edit subdirectory contents too. To delete subdirectories, delete all their contents and the subdirectory itself in the editor.

find -type f | vidir -
    Edit all files under the current directory and subdirectories.


# vipe
Mete un editor como parte de nuestra pipe de comandos

cmd1 | vipe | cmd2

cat fichero | vipe > nuevo_fichero


# sponge
Nos permite leer un fichero, tratarlo y volver a escribir sobre el mismo sin romperlo.

Hacer esto pero funcionando:
cat fichero | grep -v lineafea > fichero

Sería:
cat fichero | grep -v lineafea | sponge fichero

Otro ejempli tipico:
cat fichero | sort | sponge fichero
