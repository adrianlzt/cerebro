http://sourceforge.net/apps/mediawiki/qlandkartegt/index.php?title=QLandkarte_GT

El mejor programa que he encontrado para meter coordenadas al GPS:
qlandkartegt y qlandkartegt-garmin

Ejecutar como root

Configurar el GPS en:
Preferencias -> General -> Dispositivo -> Garmin
Puerto serie: /dev/ttyUSB0

Pinchar en "Descargar todo" para obtener los datos que estaban guardados en el gps.

Puede que falle al descargar las rutas y se quede una ventana al 1%, cerrarla sin más.



Para cargar un mapa en el programa, seleccionar la pestaña del A4 con un lapiz y una escuadra que hay abajo a la izquierda.
Escoger Stream, y dar doble click sobre OpenCycleMap.

Para localizarnos podemos usar el Mundo con una lupa, y buscar con el servidor OpenRouteService.


Para cargar mapas de cartografía de españa:
Archivo -> Cargar mapa online ->
  Spain IGN Base
  Spain IGN Carto
  Spain IGN Ortho



Para borrar datos iremos a la pestaña de waypoints, o de rutas, seleccionaremos, y daremos a suprimir.



Crear mapa a partir de imagen:
http://sourceforge.net/apps/mediawiki/qlandkartegt/index.php?title=Georeference_a_map

Cargamos la imagen. Tendremos que seleccionar tres puntos y decir sus coordenadas.
En el paso 2 pincharemos en la barita mágica para seleccionar el tipo de coordenadas:
UTM zona 30 norte (puede ser 29, 30 o 31 dentro de la península: http://commons.wikimedia.org/wiki/File:LA2-Europe-UTM-zones.png)
European Datum 1950 (ED50)

Las coordenadas en ese datum podemos sacarlas de http://www2.ign.es/iberpix/visoriberpix/visorign.html?x=716369.2186&y=4730436.6667&zone=30&r=1356&visible=MAPA_MTN25;

Las ponderemos como aaaaa bbbbbbb (separadas por un espacio en blanco)

Daremos a comenzar proceso. Este nos generará un fichero de igual nombre pero terminado en _ref.tif donde estará el mapa georeferenciado (en el paso 1 podemos indicar donde queremos generar este fichero)

Ahora podemos cargar ese mapa dando a Archivo -> Cargar mapa


Cargar mapa georeferenciado (jpg+jgw)
Se puede obtener de iberpix
Mirar gdal.md

