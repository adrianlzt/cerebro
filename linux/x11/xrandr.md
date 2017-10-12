Gestionar varias pantallas.
Podemos decidir su resolución, donde colocarlas (respecto a otra) y si deben estar apagadas o encendidas:

xrandr
  muestra las pantallas y las resoluciones disponibles

xrandr --output IDPANTALLA --off
  apagar una pantalla

xrandr --output $PRIMARY --primary --auto --output $EXT1 --auto --right-of $PRIMARY
  poner una pantalla externa a la derecha de la principal

xrandr --output DP1 --mode 1280x1024
  cambiar la resolucion de una pantalla

xrandr --fb 1024x768 --output VGA --transform 1.24,0.16,-124,0,1.24,0,0,0.000316,1
  Displays the VGA output in trapezoid shape so that it is keystone corrected when the projector is slightly above the screen


# Autorandr
https://github.com/phillipberndt/autorandr
Auto-detect the connect display hardware and load the appropriate X11 setup using xrandr

yaourt -Ss autorandr-git

autorandr -l horizontal
  todas las pantallas unidas horizontalmente (puede que descolocadas)
autorandr -l vertical
autorandr -l common
  espejo entre todas las pantallas con la máxima resolución común
autorandr -l common
  espejo entre todas las pantallas, las pequeñas pantallas con escaladas para poder reproducir la grande

Generalmente partiremos de una de estas tres configs. La retocaremos con comandos xrandr para colocar segun queremos y luego guardaremos la config:

