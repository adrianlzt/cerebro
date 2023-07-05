https://platformio.org/

aur/platformio

Si ya tenemos un fichero platformio.ini podemos hacer el build con:
pio run

En el caso de que tengamos varios "env" dentro, podemos seleccionar uno con:
pio run -e t-camera-v162

Para subirlo a la tarjeta (esto parece que hace build + upload):
pio run -e t-camera-v162 -t upload


Para conectar un terminal con el device
pio device monitor
