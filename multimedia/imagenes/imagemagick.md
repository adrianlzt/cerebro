http://www.imagemagick.org/Usage/

Información sobre la imagen:
http://www.imagemagick.org/script/identify.php
identify file.jpg


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
