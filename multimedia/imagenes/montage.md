http://www.imagemagick.org/Usage/montage/
http://unix.stackexchange.com/questions/4046/remove-extra-tilespace-from-a-montage-imagemagick-composite-image
http://superuser.com/questions/290656/combine-multiple-images-using-imagemagick

Unir las imágenes sin bordes en una matriz de 11x7 y guardarlo en el fichero montaje.jpg
montage $(ls -1 | sort -V) -geometry +0+0 -tile 11x7 montaje.jpg
