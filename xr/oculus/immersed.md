https://immersed.com/setup#

Nos pone las pantallas del pc en las gafas.

Bajar el agente (AppImage)

Antes de arrancarlo usar v4l2loopback


# Crear ventanas virtuales
recomiendan 1440x900 de resolución para mejor performance


# Configuración
Intentando seguir lo que dice el tipo del artículo

La config del autor del artículo
https://www.facebook.com/groups/xr4work/posts/909884312943397/?comment_id=920581088540386&reply_comment_id=923022994962862&notif_id=1634592386988190

## Ventanas
2560x1440 - Main (center)
1920x1080 - Console (bottom)
1080x1920 - Reference (left)

laptop: 1920x1080
VIRTUAL1 (main): 2560x1440
    full_mode=$(cvt 2560 1440 | tail -1 | cut -d ' ' -f 2- | tr -d '"')
    mode=$(echo $full_mode | cut -d ' ' -f 1)
    xrandr --newmode ${full_mode}
    xrandr --addmode VIRTUAL1 ${mode}
    xrandr --output VIRTUAL1 --left-of eDP1 --mode ${mode}
VIRTUAL2 (reference):
    full_mode=$(cvt 1080 1920 | tail -1 | cut -d ' ' -f 2- | tr -d '"')
    mode=$(echo $full_mode | cut -d ' ' -f 1)
    xrandr --newmode ${full_mode}
    xrandr --addmode VIRTUAL1 ${mode}
    xrandr --output VIRTUAL1 --left-of eDP1 --mode ${mode}

Chequear con arandr que todo está correcto

Borrar pantallas virtuales (para que funcione el autorandr):
xrandr | grep -A 1 "VIRTUAL[0-9] connected" | paste -sd ' ' - - | awk '{print $1" "$11;}' | xargs -I{} echo xrandr --delmode {}

## Fuente
Input font https://input.djr.com/
pacman -S ttf-input

En vez de usar el paquete, he configurado la fuente a mi gusto en su web y la he bajado de ahí.
URL con la config usada:
https://input.djr.com/download/index.html?customize&fontSelection=whole&a=ss&g=ss&i=serif&l=serif&zero=slash&asterisk=height&braces=straight&preset=default&line-height=1.3&email=

Alternates
    --a=ss
    --asterisk=height
    --braces=straight
    --g=ss
    --i=serif
    --l=serif
    --zero=slash

Line Height: 1.3×

Copiados los directorios con las fuentes a ~/.fonts
Luego para cargarlas en el os
fc-cache -fv

Se veía muy mal una que probé.
Vuelvo a probar con el paquete de arch

Parece que funciona, pero no veo que me aporte mucho respecto a la fuente "monospace"

## Colores
Probando con esquemas de negro. Dice que mejora por no se que del corrimiento al rojo de las gafas.

Usar pywal para cambiar los colores
Cambiar polybar

### NVIM
Esquema de colores oscuro:
:colorscheme nord
Esquema de colores claro:
:colorscheme ayu

### Terminal / alacritty
Cambiar el formato con pycritty

Esquema de colores oscuro:
pycritty load nord

Esquema de colores claro:
pycritty load origin


## Principal
4k: 3480x2160_60.00
Subí el tamaño de letra del terminal hasta tener 143* líneas * 434 columnas.
Sería tamaño 11, 12, 13, algo así.
Me parece muy muy pequeño.
A parte que el navegador, etc, se ve muy pequeño.

Probar con resoluciones más grandes sin modificar el tamaño de letra por defecto de la terminal?
Probar con las fuentes "sharp" que comenta?


Jugar con pycritty para encontrar la config adecuada

