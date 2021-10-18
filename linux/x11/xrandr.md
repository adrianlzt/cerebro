UI: arandr

Gestionar varias pantallas.
Podemos decidir su resolución, donde colocarlas (respecto a otra) y si deben estar apagadas o encendidas:

pdf sobre las novedades de xrandr 1.3: http://www.vis.uni-stuttgart.de/~hopf/pub/Fosdem_2009_randr13_Slides.pdf
Explican un poco el tema de las transformaciones

http://fomori.org/blog/?p=59
programa en python para proyectar con mplayer corrigiendo el desvio

https://sfxpt.wordpress.com/2011/02/02/panning-using-xrandr/
"truco" para ver un video a pantalla completa reduciendo la resolución en vez de incrementar virtualmente la resolución del vídeo via software (coste cpu)
xrandr --output VGA-1 --mode 640x480 --panning 1920x1080
  ponemos la resolución de la pantalla a 640x480 aunque el "escritorio virtual" medirá 1920x1080. Nos desplazaremos por él moviendo el ratón a los bordes

xrandr
  muestra las pantallas y las resoluciones disponibles

xrandr --verbose
  mostrar toda la info, transformaciónes incluídas

xrandr --output IDPANTALLA --off
  apagar una pantalla

xrandr --output $PRIMARY --primary --auto --output $EXT1 --auto --right-of $PRIMARY
  poner una pantalla externa a la derecha de la principal

xrandr --output DP1 --mode 1280x1024
  cambiar la resolucion de una pantalla

xrandr --output eDP1 --transform 1,0,0,0,1,0,0,0,0.85
  aumentar virtualmente la resolución de una pantalla (en este caso, hacerla un 15% más grande)
  pero no me deja mover el raton hasta los bordes inferiores

xrandr --fb 1024x768 --output VGA --transform 1.24,0.16,-124,0,1.24,0,0,0.000316,1
  Displays the VGA output in trapezoid shape so that it is keystone corrected when the projector is slightly above the screen

xrandr --output HDMI1 --transform 1.16129,0.12903,-116.12903,0,1.16129,0,0,0.00018,1
  trapecio con la parte ancha abajo https://lists.freedesktop.org/archives/xorg/2013-October/056060.html

a=1.24 (scale x)
b=0.16 (pendiente del lateral izquierdo. Positivo, agujas del reloj)
c=-124 (translation x. Positivo, mueve la pantalla hacia la derecha)
d=0 (pendiente lateral inferior. Positivo, contrario agujas del reloj)
e=1.24 (scale y)
f=0 (translation y. Positivo, sube la pantalla)
g=0 (deformación de la parte inferior de la pantalla. Positivo, lado derecho, negativos, lado izquierdo. Usar del orden de 0.0001)
h=0 (deformacion del lateral derecho. Positivos, esquina inferior. Negativos superiro. Usar del orden de 0.0001)
i=1 (variar tamaño de toda la pantalla. Positivos, más grande todo)

Variando b y h conseguimos hacer la imagen tropezoidal
  con g podemos elegir que sobresalga más el lado superior derecho (+) o el izquierdo

Transform se usa:
a b c
d e f
g h i

Generalmente: a and e corresponds to the scaling on the X and Y axes
              c and f corresponds to the translation on those axes
              g=h=0, i=1

Las fórmulas para calcular la posición de un pixel tras la transformación:
 x' = (ax + by + c) / w'
 y' = (dx + ey + f) / w'
 w' = (gx + hy + i)



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



# Color
xrandr --output eDP1 --gamma 1:1:.8

Los valores son R:G:B



# Crear pantalla virtual
remoteHScreen=2560
remoteVScreen=1600
refreshRate=60
existingScreenName="DP1"

params=$(gtf ${remoteHScreen} ${remoteVScreen} ${refreshRate} | grep Modeline | sed 's/^\s\sModeline \".*\"\s*//g')

xrandr --newmode "extraScreen" ${params}
xrandr --addmode VIRTUAL1 extraScreen
xrandr --output VIRTUAL1 --left-of ${existingScreenName} --mode extraScreen


Con gtf me ha dado problemas. En la wiki de arch dicen con cvt:
Creando una pantalla virtual de 4k
➜ cvt 3480 2160
Modeline "3480x2160_60.00"  645.25  3480 3768 4144 4808  2160 2163 2173 2237 -hsync +vsync
➜ xrandr --newmode "3480x2160_60.00"  645.25  3480 3768 4144 4808  2160 2163 2173 2237 -hsync +vsync
➜ xrandr --addmode VIRTUAL1 3480x2160_60.00
➜ xrandr --output VIRTUAL1 --left-of ${existingScreenName} --mode 3480x2160_60.00



Borrar la pantalla virtual
xrandr --output VIRTUAL1 --off
xrandr --delmode VIRTUAL1
xrandr --rmmode extraScreen
