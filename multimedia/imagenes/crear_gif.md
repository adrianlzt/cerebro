Varias imagenes a gif:
convert output/* output.gif
convert -loop 0 -delay 100 in1.png in2.png out.gif



for f in *.png ; do convert $f $(basename $f .png).gif ; done
gifsicle --delay=200 --loop *.gif > anim.gif
sudo pacman -S gifsicle



En Gimp:
Meter las imágenes en capas.
Exportar como GIF


Crear gif a partir de un video:
mplayer -ao null <video file name> -vo jpeg:outdir=output


https://superuser.com/a/556031/526882
ffmpeg -ss 30 -t 3 -i input.mp4 -vf "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
  This example will skip the first 30 seconds (-ss 30) of the input and create a 3 second output (-t 3).
