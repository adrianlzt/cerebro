# less file1 file2 file3
:n  siguiente fichero
:p  anterior fichero

'v': salta a vim
'F': actualiza el fichero que se está leyendo y va hasta la última línea (algo como tail -f)
  Para entrar en este modo directamente: less +F fichero
  Para salir de este modo control+c
's': si estamos leyendo de un pipe (ps aux | less), nos pide un nombre de fichero donde guardará el contenido.
     tambien se puede hacer con "-o fichero". O tambien "-O fichero" sobreescribiendo.

Uso como tail (pero no se le pueden poner pipes)
less +F fichero
  Con control+c saltamos al modo normal de less
  Con 'F' volvemos al modo 'tail -f'
  Para varios ficheros, mejor usar tail -f

~/.lesskey 
#env
LESS = -X -i -R -F -M

# -X: no hacer flush de la pantalla al salir
# -i: busqueda case insensitive
# -R: tratar bien los colores
# -F: salir de un fichero si se muestra completo en la pantalla
# -M: mostrar más información del fichero



b  previous page
<N>G  línea N
/cosa  buscar cosa hacia adelante
?cosa  buscar cosa hacia atrás
&cosa  mostrar solo las líneas que tengan "cosa"
  entrar con less +F (y luego control+c) para que no se salga de less
=  info del fichero

&!PALABRA|COSA
  Nos muestra la pantalla sin esas dos palabras


Líneas largas, no cortarlas para mostrar toda la línea:
less -S
