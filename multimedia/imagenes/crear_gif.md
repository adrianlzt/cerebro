for f in *.png ; do convert $f $(basename $f .png).gif ; done
gifsicle --delay=200 --loop *.gif > anim.gif


En Gimp:
Meter las imágenes en capas.
Exportar como GIF
