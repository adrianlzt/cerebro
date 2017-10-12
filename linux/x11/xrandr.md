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


# Autorandr
https://github.com/phillipberndt/autorandr
Auto-detect the connect display hardware and load the appropriate X11 setup using xrandr

yaourt -Ss autorandr-git

autorandr -l horizontal
  todas las pantallas unidas horizontalmente (puede que descolocadas)
autorandr -l vertical
autorandr -l common
  espejo entre todas las pantallas
