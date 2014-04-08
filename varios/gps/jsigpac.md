https://sites.google.com/site/jrariasf/

Para bajar mapas del sigpac

wget https://sites.google.com/site/jrariasf/Home/jSIGPAC_v5.6.14.zip?attredirects=0&d=1
unzip jSIGPAC_v5.6.14.zip
cd jSIGPAC/
java -Xmx1000m -jar JSigpac.jar

Pinchar en el letrero "carpeta" para seleccionar donde se guardarán las imágenes.
Descargar de IGN-Iberpix
Se puede seleccionar ortofoto o topográfico.

Usar el sigpac para determinar las coordenadas:
http://sigpac.aragon.es/visor/

Podemos seleccionar esquina superior izquierda y esquina inferior derecha.
Damos a descargar y nos bajara en cachitos todas las imágenes.

La parte de abajo del programa no me funciona para unir las imágenes, pero se puede hacer con ImageMagick
montage $(ls -1 | sort -V) -geometry +0+0 -tile 11x7 montaje.jpg

