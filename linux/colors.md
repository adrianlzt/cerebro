https://github.com/dylanaraps/pywal
Generate and change color-schemes on the fly.
Applies the colors system-wide and on-the-fly in all of your favourite programs.


Muchas CLIs cuando detectan que van a enviar su salida a un pipe quitan los colores, por ejemplo ls o ansible.
Si estamos usando tee esto quiere decir que nos quedamos sin colores.
Lo que podemos hacer es usar unbuffer
unbuffer ls -l --color=auto | tee output.log

En ubuntu/debian está en el paquete expect-dev
En RHEL: expect

Otras formas con script
https://stackoverflow.com/questions/3515208/can-colorized-output-be-captured-via-shell-redirect
Con "script -c 'CMD' parece que funciona con algunos (ansible) pero no con otros (ls -la)"



https://github.com/trapd00r/LS_COLORS
Usar este repo para los colores
Instalado en arch lscolors-git
Algunos custom en .zshrc

Los colores que se muestra en ls podemos ver como están definidos con:
echo $LS_COLORS

Base de datos de colores por defecto:
dircolors --print-database

Se almacenan en: $LS_COLORS

Si editamos el fichero .dir_colors con vim, nos mostrará los colores que estamos definiendo según los vayamos cambiando
Ejemplo:
.log                  38;5;90


Como se definen:
FILE-TYPE Attribute codes: Text color codes:Background color codes

Where,

FILE-TYPE: is file type like DIR (for directories)
Attribute codes:
00=none
01=bold
04=underscore
05=blink
07=reverse
08=concealed
Text color codes:
30=black
31=red
32=green
33=yellow
34=blue
35=magenta
36=cyan
37=white

Background color codes:
40=black
41=red
42=green
43=yellow
44=blue
45=magenta
46=cyan
47=white

For example to define Bold Blue color for DIR file type, entry should look as follows:
DIR 01;34
