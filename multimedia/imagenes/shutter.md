# Teiler
El que suelo usar es teiler

Por debajo usa "maim", ejemplo:
maim --hidecursor -g 1920x1080+3440+360 /home/adrian/Imagenes/Screenshots/img-2023-09-27-110757.png


Borrar una imagen subida:
 /home/adrian/adrianRepo/multimedia/imagenes/screenshot.md
imgurbash2 -d DELETEHASH


# ImageMagick import
http://www.imagemagick.org/script/command-line-options.php#write
Capturar una pantalla en concreto
import -window NOMBRE_O_ID_VENTANA out.png


# flameshot
https://github.com/flameshot-org/flameshot
Captura y edición de screenshots de forma muy sencilla.


# shutter
Pequeño editor de fotos que tambien hace capturas

Hace falta instalar un plugin para poder editar (perl-goo-canvas)

yay -S shutter perl-goo-canvas perl-image-exiftool gnome-web-photo
