# JSN-SR04T
25cm - 800cm
resistente al agua
Lib para arduino: NewPing (https://bitbucket.org/teckel12/arduino-new-ping/wiki/Home)

# AJ-SR04M
Los que parece que se empiezan a vender ahora (2020)
https://bitbucket.org/teckel12/arduino-new-ping/issues/40/aj-sr04m-board

He tenido que meter un factor de correción para que mida correctamente.


# HC-SR04
https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf

Obligatorio usarlo con 5V
Con 3.3v (al menos con los 3.3v de nodemcu) no funciona

Video donde no le funciona con 3.3 y si con 5v (usando nodemcu)
https://www.youtube.com/watch?v=CnKPiynzAbs

Parece que con ciertos materiales no rebota bien el sonido y no obtiene medida.
Me está pasando con un forro polar.


## Python
https://github.com/rsc1975/micropython-hcsr04

Libreria para obtener distancia
Mirar PR para poder setear temperatura ambiente para mejorar el cálculo (la velocidad del sonido varía con la T)


Parece que cuando el sensor no detecta (machine.time_pulse_us()) bien devuelve un -1, que en distance_cm() es -0.0171821
