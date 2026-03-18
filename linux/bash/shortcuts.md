# Borrar/pegar
Control+u borrar hasta comienzo de linea
Control+k borrar hasta comienzo final de linea
Control+y pegar lo que hemos borrado con C^u/k

Esc+d borrar la siguiente palabra
Alt+d borrar la siguiente palabra
Control+w borrar hasta la anterior palabra


C^l clear

C^a+C^a ir a comienzo de linea
C^e final de linea
C^b comienzo de palabra
C^f final de palabra
C^x+C^x movernos entre el comienzo de la línea y la posición actual
C^arrows movernos de palabra en palabra

Alt+t swap la palabra actual con la anterior

C^r buscar en el historial

C^_ es como control+z (deshacer)



# TTY
TTY (Teletype): Son controladores básicos del terminal. No entienden de sintaxis, solo ven caracteres y espacios. Son los "ancestros" del sistema.

Ctrl + W
Borrar palabra anterior
Borra todo hasta el primer espacio en blanco.

Ctrl + U
Borrar hasta el inicio
En Bash, borra desde el cursor hacia el principio de la línea."

# Readline
Readline: Es la biblioteca que usa Bash (y otros) para la edición de líneas. Es mucho más sofisticada y permite diferenciar entre letras, números y símbolos de puntuación.

Alt + D
Borrar siguiente palabra
Borra desde el cursor hasta el final de la palabra actual (hacia la derecha).

Alt + Backspace
Borrar palabra anterior
Preciso: Se detiene en caracteres especiales como /, . o _.

Ctrl + K
Borrar hasta el final
Elimina todo el texto desde la posición del cursor hasta el final de la línea.

Ctrl + U
Borrar hasta el inicio
En Bash, borra desde el cursor hacia el principio de la línea."

Ctrl + Y
Pegar (Yank)
Recupera (pega) lo último que hayas borrado con los comandos anteriores.
