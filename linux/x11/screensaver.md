#!/bin/sh
export DISPLAY=:0.0

# "xset x" es igual a "xset screensaver"
xset s off
xset s noblank
xset -dpms

# Para ver el estado actual de la configuración
# xset q
