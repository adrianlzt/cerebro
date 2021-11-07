Con enclavamiento, que tras accionarlos se quedan en esa posición.


Uno para control con 5V
G5RL-1-E-HR-DC12
Con 3V funciona, pero requiere demasiada corriente, por lo que no se puede conectar directamente.
También por corrientes al apagar el relay: https://forum.arduino.cc/t/conecting-relay-direct-to-arduino/406437

Usaremos un esquema con un transistor NPN, una resistencia y un diodo.
https://elosciloscopio.com/tutorial-reles-arduino-y-esp8266/

Cuidado al usarlo con un transistor, asegurarse que el transistor tiene suficiente corriente en la base para que circule la corriente necesaria por el relé.
