# Pantalla interna (la del portatil por ejemplo)
xbacklight -set [0-100]

alias brillo='xbacklight -set'



Meter en el /etc/rc.local para que se ponga al inicio


Otra forma
echo 100 | sudo tee /sys/class/backlight/intel_backlight/brightness

Subirlo por encima del máximo (se verá peor)
xrandr --output eDP1 --brightness 1.2



# Hardware, pantallas externas
https://askubuntu.com/a/1181157/273577

Ver pantallas detectadas
ddccontrol -p

Cambiar brillo (la dirección de memoria, 0x10, aparece en las opciones permitidas en el listado anterior)

Para la pantalla que tengo, entre 0 y 100 (supongo que esta direc de memoria y el rango serán bastante estándars)
ddccontrol dev:/dev/i2c-13 -r 0x10 -w 10




# Software
xrandr --output VGA1 --brightness 0.63

Hace un poco "ñapa" y deja una visualización bastante mala



# Script tonto que sube tanto sw por hw
current=$(xbacklight -get | cut -d . -f 1)
if [[ $1 = 'down' ]]; then
    new=$(($current - 10))
else
    new=$(($current + 10))
fi

xbacklight -set $new
ddccontrol dev:/dev/i2c-13 -r 0x10 -w $new

