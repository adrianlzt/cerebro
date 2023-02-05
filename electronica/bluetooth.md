# BLE (Bluetooth Low Energy)
https://randomnerdtutorials.com/esp32-bluetooth-low-energy-ble-arduino-ide/

https://www.youtube.com/watch?v=vrcPGeYinVQ
Parece que hay chips (NRF52) mejores para hacer cosas BLE con batería, que consumen menos.

Entre 0.01 y 0.5 del consumo normal de BT

Esquema cliente/servidor.
El servidor envía mensajes de "advertisment". Un cliente encuentra al server y se establece una comunicación punto a punto.

También se pueden establecer conexiones broadcast o mesh.


## DFU
Device Firmware Update (DFU) Service is a GATT-based service that can be used for performing firmware updates over BLE


## GATT (Generic Attributes)
Es el formato de datos con el que dos dispositivos BLE se comunican.
El protocolo es el "Bluetooth attribute protocol" (mirar captura echa con un android xiaomi bluetooth_attribute_protocol.pcap, filtrar con "btatt")
  se le pide sus servicios
  luego las características de cada servicio
Mirar programacion/python/gatt.py

Representación en YAML (sacada de la web de arriba):
profile:
  services:
    - uuid:
      characteristics:
        - descriptor:
          properties:
          value:

La característica es la que tendrá la propiedad de poder ser leída, escrita, notify.
Después podrá tener unos descriptors que nos den informatión sobre que es esa caracterísitca.
Por ejemplo, en un termómetro, podemos tener un service con dos características.
Una es para leer el valor, que tendrá un descriptor que al leerlo nos dirá "Temperature".
Y otra característica para definir la escala (C o F), con un descriptor que nos dice que valores podemos escribir en esa característica.




Existen ya "services" predefinidos: https://www.bluetooth.com/specifications/gatt/
Ejemplos:
  WSP: Weight Scale Profile
  WSS: Weight Scale Service

Listado de los UUID para cada servicio:
https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf
Listado de asignaciones para compañías y luego ("GATT Characteristic and Object Type") para servicios.

Cada servicio tiene un XML definiendo que debe implementar.
Por ejemplo, el de Alarm Notification Service: https://www.bluetooth.com/wp-content/uploads/Sitecore-Media-Library/Gatt/Xml/Services/org.bluetooth.service.alert_notification.xml

Tenemos que tener tanto el UUID del servicio como de las características.
Ejemplo para hearth rate monitor:
https://docs.micropython.org/en/latest/library/bluetooth.html#bluetooth.BLE.gatts_register_services
```
HR_UUID = bluetooth.UUID(0x180D)
HR_CHAR = (bluetooth.UUID(0x2A37), bluetooth.FLAG_READ | bluetooth.FLAG_NOTIFY,)
HR_SERVICE = (HR_UUID, (HR_CHAR,),)
SERVICES = (HR_SERVICE, UART_SERVICE,)
( (hr,), (tx, rx,), ) = bt.gatts_register_services(SERVICES)
```


Existe también el concepto de "handle", que, por lo que entiendo, es como un link a un UUID determinado.
The attribute handle is a unique 16-bit identifier for each attribute on a particular GATT server


Por ejemplo, con el termómetro BLE de xiaomi, bluetoothctl nos da:
service - start: 0x0016, end: 0x0019, type: primary, uuid: 0000180f-0000-1000-8000-00805f9b34fb
          charac - start: 0x0017, value: 0x0018, props: 0x12, ext_props: 0x0000, uuid: 00002a19-0000-1000-8000-00805f9b34fb

Pues 0x0018 sería el handle para el uuid 00002a19-0000-1000-8000-00805f9b34fb (battery level), que sería un atributo read/notify del servicio 0000180f-0000-1000-8000-00805f9b34fb (battery service)


En este caso aquí se expone un service privativo de xiaomi donde dice la temperatura.
La info que quiero se la pido con un notify a la caracterísitca 226c0000-6476-4566-7562-66734470666d
En la prop 00002902-0000-1000-8000-00805f9b34fb (handle 0x0010) está la info (devuelve un array de caracteres).
service - start: 0x000c, end: 0x0015, type: primary, uuid: 226c0000-6476-4566-7562-66734470666d
          charac - start: 0x000d, value: 0x000e, props: 0x10, ext_props: 0x0000, uuid: 226caa55-6476-4566-7562-66734470666d
                  descr - handle: 0x000f, uuid: 00002901-0000-1000-8000-00805f9b34fb
                  descr - handle: 0x0010, uuid: 00002902-0000-1000-8000-00805f9b34fb
                  descr - handle: 0x0011, uuid: 00002904-0000-1000-8000-00805f9b34fb



Script de python con la lib bleak para obtener servicios, característias y descriptors:
https://gist.github.com/adrianlzt/92b46d4a86844a0caeda625d49d22a12
