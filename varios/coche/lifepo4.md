La prueba de carga que hice sobre mis lifepo
https://gitlab.com/-/snippets/2188555


# Resumen
Comprar 4 celdas LiFePo4

Conectarlas en serie.
Agregar un BMS, yo he usado este de Daly: https://es.aliexpress.com/item/4000965709746.html?spm=a2g0s.12269583.0.0.543c3eaaqzd7yG (150A Common port, LiFePo4 4S12V)
Comprobar bien que conectamos bien los cables.
Para arrancar el BMS la primera vez tenemos que conectarlo al cargador y hacer un corto entre P- y B- unos pocos segundos.

Configurar el BMS:
  - V max cell: 3.65
  - V min cell: 3
  - V max battery: 14.6
  - V min battery: 12

Cargar la batería, yo he usado este cargador: https://www.aliexpress.com/snapshot/0.html?orderId=8131625223548981

Una vez está cargada, hay que hacerle el top balacing: https://www.youtube.com/watch?v=x5ABvbbics8

Desconectar el BMS y conectar las celdas en paralelo.

Usar una fuente de alimentación (https://www.amazon.fr/dp/B085S34NNW/ref=pe_27091421_487030221_TE_SCE_dp_3) para conectar las celdas a 3.60v

Esperar hasta que la corriente caiga a 0.1A (puede tardar más de 24h, dependerá del tamaño de las celdas y como de cerca estuvieran todas de su carga total)

Una vez hecho el top balancing vamos a hacer la prueba de carga.

Volver a conectar las céldas en serie y conectar de nuevo el BMS.

Conectar el puerto serie del BMS con el adaptador USB a un PC linux para obtener datos.

Usamos https://github.com/dreadnought/python-daly-bms/blob/main/dalybms/daly_bms.py para extraer los datos.

Conectar una carga a la batería para comprobar cuanta energía acumula.

Podemos usar bombillas de coche como carga, suelen tener una potencia de 55W. Lo bueno es que no hacen ruido, no se calientan mucho y pueden estar encendidas muchas horas.

Una vez hecho el test de carga, volver a cargar la batería y reconfigurar el BMS para poner un limite menor al voltaje máximo (para que trabaje en el ~90-10% del SOC):

3.46V/cell

13.84V/battery

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

Tras hacer el top balance y dejarlas una noche separadas, las células tenían una diferencia de hasta 0.1v, siendo la más alta
la que estaba más cerca del generador y la más baja la más lejana.
Vuelvo a hacer el top balance conectando el generador cerca de la cécula más lejana.

# Daly BMS
https://evwhite.pl/wp-content/uploads/2021/01/dalybms_instrukcja.pdf

Según este link:
https://www.dkvolt.dk/wp-content/uploads/2019/12/Daly-48V-16S-BMS-manual.pdf
Antes de conectar los módulos tienen que tener una diferencia menor de 0.05v.
Una resistencia interna menor a 5mOhm

Como hacer la instalación
https://www.youtube.com/watch?v=qb1I8WrQvJM

Los 3 cables intermedios pueden estar conectados a uno u otro lado del busbar.
He visto que hay diferencia de como se configure.
Por ejemplo, si la célulca 4 (la que tiene el cable negativo) tiene el siguiente cable en el otro lado del busbar, la caída de tensión que verá el BMS para esa célula será mayor.

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
