# Proxi alignment
El BCM (body computer) almacena la configuración central y la puede copiar a otras ECUs mediante la operativa "proxi alignment".
Cuando abrimos esa operativa en un software de diagnosis nos permite seleccionar que ECUs deben estar conectadas al CANbus.
Podemos añadir/quitar ECUs de esa lista
http://www.diagwiki.com/fiat-proxi-alignment


# BCM (body computer)
El body computer almacena parametrización de como deben comportarse ciertas partes.
Por ejemplo, en este video modifican esos parámetros para activar la luz day-light: http://www.obdtester.com/videos/ficom_enable_drl_menu
Screenshot con otros parámetros: http://www.obdtester.com/screenshot/ficom13


# CANbus
https://medium.com/@fmntf/connecting-to-the-infotainment-can-network-34a79b6de0d8

Yes, FiCOM supports all 3 CAN-BUSes used in Fiat vehicles.
  entonces parece que los fiat tienen 3 canbus distintos

No se puede controlar el lock/unlock con canbus? https://community.teltonika-gps.com/14102/lock-%26-unlock-doors-via-can-bus-on-fiat-ducato-2014

Para Fiat parece que tenemos C-CAN (high speed) y B-CAN (low speed), ambos conectados al BCM.
https://www.fiatforum.com/stilo/85794-can-bus-scheme-stilo.html

En el C-CAN tenemos:
  electric steering control unit
  engine management control unit
  ABS control unit
  Adaptive Cruise Control ECU
  ''SELESPEED'' gearbox control unit
  steering sensor unit

En el B-CAN:
  underfacia control unit
  instrument panel
  driver door control unit , passenger door
  boot control unit
  Passive Entry control unit
  steering lock control unit
  radio controls on the steering wheel
  built-in radio-phone-navigation unit
  parking sensor control unit
  climate control system control unit (or additional heater control unit )
  driver'' seat and passenger seat control units.




# OBD2 / Software de diagnosis

Parece que fiat puede usar dos protocolos sobre CAN-BUS (ISO 11898) (http://auto-diagnostics.info/pdf/ficom-manual-en.pdf):
  ISO15765
  UDS (ISO 14229)


## FiCOM
http://www.obdtester.com/ficom

Se vende con un hardware específico
Unos 300€

Tienen un módulo para modificar el odómetro (vendido a parte): http://www.obdtester.com/ficom-odometer-correction




## Multiecuscan
http://www.multiecuscan.net/Default.aspx
Parece un programa más profesional para coches italanos, fiat, alfa romeo, etc
Da acceso a todas las ECUs, permite testearlas, reconfigurar, ejecutar procedimientos, etc

Hacen falta cables adaptadores para acceder a ...
Aquí tenemos que conecta cada cable:
https://www.multiecuscan.net/SupportedVehiclesList.aspx
Por ejemplo el cable 3 (amarillo) cambia:
  pin 6 (CAN high) por pin 1 (ABS, Brakes, K-line)
  pin 14 (CAN low) por pin 9 (Body ECU, EPS)
  pin 7 (K-line) por pin 12 (específico fabricante)

  Datos de los pins custom para Fiat según https://pinoutguide.com/CarElectronics/fiat_car_obd_ii_pinout.shtml


Entiendo que entonces Multiecuscan cuando usa ELM327 usa solo los pones 6, 7 y 14 (K-line y CAN)

Hay una versión más cara que se vende con un adaptador custom (OBD2 - bluetooth) con la que se puede acceder a toda la información sin necesitar los cables adaptadores:
https://www.multiecuscan.net/OrderMultiplexed.aspx


### Pruebas esnifando el código que genera MultiEcuScan


Leo estos códigos, pero si intento ejecutarlos yo no funcionan.
Algún tipo de registro previo?

Voltaje: 221955 ?

Odómetro: 222001
Respuesta: 622001 0FA42D

Activar luz cruise control: 2F502C03FF
Desactivar luz cruise control: 2F502C0300

Intermitente izquierdo:
  on:  2F500903FF
  off: 2F50090300


Parece que cuando conectamos el cable amarillo no estamos conectando a otro canbus, o al menos no a un canbus de 500kb, o no veo nada con candump


3E00, esto que es?
Siempre le contesta con 7e00


## TODO
Probar a hacer capturas enteras desde que el MES conecta hasta que solicita algún dato que ya conozcamos
