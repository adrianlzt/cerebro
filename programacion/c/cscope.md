http://cscope.sourceforge.net/

Herramienta para buscar funciones, variables, ficheros, etc en un proyecto en c
Indexa todo para que luego sea mucho más rápido buscar.

cd proyecto_en_c/
cscope -bqR
  crear el index
cscope -dq
  entrar en la interfaz ncurses

Una vez dentro bajaremos con las flechas hasta la linea de lo que queremos buscar, pondremos el nombre e intro.

Control+d para salir

Control+c cambia case sensitive/insensitive


Usar con vim:
http://cscope.sourceforge.net/cscope_vim_tutorial.html
