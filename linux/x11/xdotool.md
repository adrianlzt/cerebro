Mirar también linux/events.md



http://tuxradar.com/content/xdotool-script-your-mouse

Controlar el mouse desde la linea de comandos
If your screen resolution is 1024x768, then the co-ordinates for the top right location are 1023 (X) and 0 (Y). The bottom-right is 1023 (X) and 767 (Y), and so forth.

xdotool mousemove 0 0 click 1

Ver posición actual del raton:
xdotool getmouselocation --shell


Escribir una string
xdotool type "xxx"

Pulsar control+tab con un script de xdotool (no se porque, pero hay que meter un sleep)
keydown Control_L Tab
sleep 0.5
keyup Control_L Tab


Podemos enviar keystrokes a una ventana determinada.
Para obtener el id de la ventana:
xdotool search --name "Pulse Secure"
  la opción --onlyvisible puede ser útil para no obtener IDs de ventanas ocultas

Para enviar el keystroke a esa ventana:
xdotool key --window 12345 Enter

Obtener el id de una ventana pinchando sobre ella:
xdotool selectwindow



Otra opcion
https://linux.die.net/man/1/wmctrl


# Touchpad
Activar click con el touchpad
synclient TapButton1=1

## Syngesture
https://github.com/mqudsi/syngesture
Acciones ante patrones más complicados.
Por ejemplo, mover cuatro dedos en una dirección.

Config
~/.config/syngestures.toml

Hace falta configurar el /dev/input del mouse.
Para saber cual poner, arrancar "evtest" sin parámetros.

Hace falta SUID en el binario evtest (tal vez se quite esta dependencia en el futuro)
sudo chmod u+s $(which evtest)
