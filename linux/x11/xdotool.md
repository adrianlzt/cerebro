http://tuxradar.com/content/xdotool-script-your-mouse

Controlar el mouse desde la linea de comandos
If your screen resolution is 1024x768, then the co-ordinates for the top right location are 1023 (X) and 0 (Y). The bottom-right is 1023 (X) and 767 (Y), and so forth.

xdotool mousemove 0 0 click 1



Pulsar control+tab con un script de xdotool (no se porque, pero hay que meter un sleep)
keydown Control_L Tab
sleep 0.5
keyup Control_L Tab



Otra opcion
https://linux.die.net/man/1/wmctrl


# Touchpad
Activar click con el touchpad
synclient TapButton1=1
