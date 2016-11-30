http://www.imagemagick.org/Usage/

Información sobre la imagen:
http://www.imagemagick.org/script/identify.php
identify file.jpg
identify -verbose file.jpg


Resize
http://www.imagemagick.org/Usage/resize/#resize
convert archivo.jpg -resize 40x40 out.jpg
convert -resize "30%" screenshot.png screenshot.th.png

Screenshot:
import -window root -quality 98 screenshot.png

Convertir imágenes a pdf:
convert imagen1.png imagen2.png libro.pdf

Rotar:
convert in.jpg -rotate 90 out.jpg
convert -rotate -90 a.jpg a.jpg

Cortar:
convert in.jpg -crop 350x280+7+184 out.jpg
  Tamaño (ancho x alto) + desplazamiento (x + y)

# Borde
Añadir un borde negro de 1px alrededor de la imagen
convert imagen.png -bordercolor Black -border 1 nueva.png

# Paint
Un circulo
convert prueba.gif -draw 'circle 400,400 410,410' nueva.gif
  el centro en 400,400 hasta. El radio llega hasta la coordenada 410,410

convert prueba.gif -draw 'fill red circle 525,405 527,407' -draw 'fill red circle 600,610 605,615' nueva.gif
  dibujo dos puntos rojos

# Texto
Fuentes disponibles
convert -list font

convert prueba.gif -draw 'text 610,620 "Chamonix"' nueva.gif
  pinta "Chamonix" empezando en esas coordeandas con la fuente Ubuntu

# Modificar/añadir comment
convert imagen.jpg -set comment "comentario" out.jpg
identify -verbose out.jpg | grep comment

# Crear imagenes
http://www.imagemagick.org/Usage/canvas/

Imagen con ruido:
convert -size 100x100 xc: +noise Random random.jpg


# Unir
montage *.png -mode concatenate -tile 3x1 output.png
Une las imagenes en una sola fila de 3 columnas
