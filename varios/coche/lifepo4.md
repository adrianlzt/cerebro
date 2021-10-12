# LiFePo4
Una datasheet de una batería de 280Ah que podría valer como referencia
http://www.dcmax.com.tw/LF280(3.2V280Ah).pdf

Recomiendan SOC: 10%-90%
Siguiendo la tabla de https://www.bateriaslifepo4.com/bms-y-balanceadores/ estos valores serían:

https://www.solacity.com/how-to-keep-lifepo4-lithium-ion-batteries-happy/
Bajo caraga (0.25C) el voltaje al 10% SOC baja de 12.4v a 12v. Por lo que el corte debemos ponerlo a 12v (3v por célula).

https://diysolarforum.com/threads/lifepo4-charging-levels.24674/#post-291332

1 célula, 10% SOC: 3v
1 célula, 95% SOC: 3.46v

4s, 10% SOC: 12v
4s, 95% SOC: 13.84v


# Top balance
https://www.youtube.com/watch?v=x5ABvbbics8

Cargar las célculas con un cargador de 12v.
Cambiarlas a paralelo.
Cargarlas con un generador de tensión a 3.6V hasta que la corriente caiga a 0.1A o menos.

# Daly BMS
https://evwhite.pl/wp-content/uploads/2021/01/dalybms_instrukcja.pdf

Según este link:
https://www.dkvolt.dk/wp-content/uploads/2019/12/Daly-48V-16S-BMS-manual.pdf
Antes de conectar los módulos tienen que tener una diferencia menor de 0.05v.
Una resistencia interna menor a 5mOhm

Como hacer la instalación
https://www.youtube.com/watch?v=qb1I8WrQvJM

Al conectar la primera vez el BMS, entre el positivo absoluto y el P- habrá unos 10v (en el battery pack tendremos unos 13v).

Para que funcione el BMS conectar los terminales de control y luego el sensor de temperatura (NTC).
Antes de conectar los terminales de control, comprobar que cada par de pines adyacentes tienen un voltaje de ~3.2v (estamos comprobando que el cableado es correcto)
Con todo conectado, aún veremos 10v.
Tenemos que hacer un pequeño truco para "arrancar" el BMS, la activación por carga.
https://youtu.be/qb1I8WrQvJM?t=183

Ese método de activación se trata de conectar la batería+BMS a un cargador (usando el positivo absoluto y P-).
Una vez conectado el cargador, tocaremos unos segundos P- con B-.
En ese momento que conectemos, el cargador deberá comenzar a funcionar.
Al dejar de conectar P- y B- el cargador parará un momento, el BMS se activará y ya se pondrá a cargar normalmente.

A partir de aquí ya tendremos el sistema montado.

## UART - USB
Tengo problemas porque no consigo ver el bms con la app bluetooth.
Probando con el cable USB-UART si consigo conectar.

Uso esta app python para poder consultar los datos:
https://github.com/dreadnought/python-daly-bms

Al conectar el USB veo en el dmesg:
[442642.194738] usb 1-1: new full-speed USB device number 17 using xhci_hcd
[442642.339247] usb 1-1: New USB device found, idVendor=1a86, idProduct=7523, bcdDevice= 2.64
[442642.339250] usb 1-1: New USB device strings: Mfr=0, Product=2, SerialNumber=0
[442642.339251] usb 1-1: Product: USB Serial
[442642.340936] ch341 1-1:1.0: ch341-uart converter detected
[442642.341544] usb 1-1: ch341-uart converter now attached to ttyUSB0

He tenido que borrar 'brltty' porque si no, en el dmesg se añadían estos mensajes y me desaparecía /dev/ttyUSB0
[442548.861747] usb 1-1: usbfs: interface 0 claimed by ch341 while 'brltty' sets config #1
[442548.862554] ch341-uart ttyUSB0: ch341-uart converter now disconnected from ttyUSB0
[442548.862583] ch341 1-1:1.0: device disconnected
[442550.003790] input: BRLTTY 6.4 Linux Screen Driver Keyboard as /devices/virtual/input/input27

Para obtener todos los valores que nos ofrece ese software hacemos (nos devuelve un JSON con los valores):
daly-bms-cli -d /dev/ttyUSB0 --uart --all

También podemos arrancar virtualbox con windows, enchufarle el puerto serie (mirar como pasar el /dev/ttyUSB0 como puerto serie aquí https://jjmilburn.github.io/2016/04/04/ttyUSB-to-vagrant-virtualbox/) y usar el software "Daly BMS": https://diysolarforum.com/resources/daly-smart-bms-pc-software.50/
Pondremos ttyUSB1 en el com0 y al arrancar el software seleccionaremos COM0 9600 baud rate

## Notas
Si no están balanceadas las células puede que el "topping" de la batería se lleve mucho rato, porque el BMS tiene un balanceador que mueve muy pocos amperios.


## Problemas
Se pone a cargar, la app BT muestras los datos.
Tras un rato, la app BT deja de mostrar datos sobre las células.
Pero parecía que seguía cargando.
Luego desconecté el BMS, lo volví a conectar y no conseguía volver empezar a cargar.

Al final puse el USB-UART y con la app windows encendida, volvió a cargar.
