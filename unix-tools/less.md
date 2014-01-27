# less file1 file2 file3
:n  siguiente fichero
:p  anterior fichero

'v': salta a vim
'F': actualiza el fichero que se está leyendo y va hasta la última línea (algo como tail -f)

~/.lesskey 
#env
LESS = -X -i -R -F

# -X: no hacer flush de la pantalla al salir
# -i: busqueda case insensitive
# -R: tratar bien los colores
# -F: salir de un fichero si se muestra completo en la pantalla
