https://core-electronics.com.au/videos/circuitpython-vs-micropython-key-differences#:~:text=In%20Micro%20Python%2C%20you%20can,happening%20if%20something%20goes%20wrong.

Circuit Python is made by Adafruit to support the Adafruit brand boards

In Micro Python, you can have different files running at the same time and sharing the same state. Where in Circuit Python there's no sharing of States, so when one thing's running it's the only thing running and that can make it a lot easier for someone new to understand what's happening if something goes wrong.


# Instalación
https://circuitpython.org/board/lolin_s3/

Desde la propia web se puede hacer la instalación: Open installer

https://learn.adafruit.com/welcome-to-circuitpython/installing-circuitpython#start-the-uf2-bootloader-2977081
Nearly all CircuitPython boards ship with a bootloader called UF2 (USB Flashing Format) that makes installing and updating CircuitPython a quick and easy process. The bootloader is the mode your board needs to be in for the CircuitPython .uf2 file you downloaded to work



# bundle / libs

Parece que las librerías vienen a parte:
https://circuitpython.org/libraries

En los "bundle" tienen ya apps listas para usar (visto al menos para los BLE).

El bundle es un fichero .zip con las lib compiladas en .mpy

Copiar las que necesitemos a un dir lib/ en el esp32.

Para subir ficheros usar "circup" (aur/circup).


## circup
No me detecta un Wemos Lolin C3 Mini 

Ni con mpremote ni mpr soy capaz de subir fiheros.
Si de conectar al repl.

En la web hablan de usar el editor "thonny" (en AUR).


# Doc
https://docs.circuitpython.org/

La doc parece bastante buena y con muchos ejemplos ya hechos (al menos para BLE).
