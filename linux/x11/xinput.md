Modificar propiedades de los elementos de escritorio:
touchpad, keyboard, power button, webcam, etc

Desactivar click con el touchpad:

Primero ver el id del touchpad:
xinput

Luego el id del "Tap":
xinput list-props ID-TOUCHPAD | grep Tap

Desactivarlo (Synaptics Tap Time):
xinput set-prop ID-TOUCHPAD 270 0
