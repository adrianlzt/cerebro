# BLE (Bluetooth Low Energy)
https://randomnerdtutorials.com/esp32-bluetooth-low-energy-ble-arduino-ide/

Entre 0.01 y 0.5 del consumo normal de BT

Esquema cliente/servidor.
El servidor envía mensajes de "advertisment". Un cliente encuentra al server y se establece una comunicación punto a punto.

También se pueden establecer conexiones broadcast o mesh.

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

Existen ya "services" predefinidos: https://www.bluetooth.com/specifications/gatt/
Ejemplos:
  WSP: Weight Scale Profile
  WSS: Weight Scale Service
