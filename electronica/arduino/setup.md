Es la parte del código que se ejecuta al arrancar el arduino.

Tipicamente la primera linea sera el arranque de la consola:
Serial.begin(115200);

A veces también, tras esta línea se pone un delay:
delay(10);


# Pines
Aqui definimos si los pines van a ser input o output:
pinMode(5, OUTPUT);

También podemo definir el estado inicial de los pines:
digitalWrite(5, LOW);
