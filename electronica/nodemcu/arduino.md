http://github.com/esp8266/arduino
https://www.youtube.com/watch?v=0g7sazWXfEI

En arduino
Archivo -> Preferencias -> Gestor de URLs Adicionales de tarjetas:
https://arduino.esp8266.com/stable/package_esp8266com_index.json

Herramientas -> Placa XXX -> Gestor de tarjetas -> nodemcu
Instalar

Si vamos a usar arduino-cli, mirar ahora allí para instalar el core


Probar a cargar uno de los ejemplos básicos, blink
Definir donde está el led integrado para poder ejecutarlo:
#define LED_BUILTIN 2


Tardará unos segundos en subirlo.

En "herramientas -> monitor serie" podemos ver la salida


Al conectar la placa puede que tarde unos segundos (10-30) en empezar a funcionar correctamente.
En ese tiempo veremos caracteres raros en al monitor serie y tal vez varias Exceptions, hasta que arranque


# Puerto serie
En la función "setup()" deberemos activarlo:
Serial.begin(9600); // Starts the serial communication
  sincronizar los mismos baudios en el monitor serie

Luego imprimimos con
Serial.print("hola\n");


# Error

## Serial no funciona
Downgradear a 1.8.9-1
https://bugs.archlinux.org/task/62704

## Exception
A veces veremos dumps de memoria en la consola, con un mensaje "Exception"
Lo he visto tras reiniciar la placa, aunque tras unos cuantos fallos ha terminado arrancando bien.
