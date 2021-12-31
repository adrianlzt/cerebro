# Owntracks
Instalamos una app en el movil que envia nuestra posición via mqtt cuando nos movemos.

Publica sobre:
owntracks/user/DEVICE_ID
{"_type":"location","tid":"og","acc":19,"batt":94,"conn":"w","doze":false,"lat":25.120159,"lon":3.4075119,"t":"u","tst":1485682695}

Simular un dispositivo haciendo uso del service domain mqtt, publish:
{"topic":"owntracks/user/TioPruebas","payload":"{\"_type\":\"location\",\"tid\":\"og\",\"acc\":19,\"batt\":94,\"conn\":\"w\",\"doze\":false,\"lat\":25.120159,\"lon\":3.4075119,\"t\":\"u\",\"tst\":1485682695}"}


## Comandos externos
Podemos enviar comandos al movil
http://owntracks.org/booklet/tech/json/ (mirar en _type=cmd)

Ejemplo:
mosquitto_pub -h 192.168.1.1 -p 8883 -t "owntracks/user/deviceid/cmd" --cafile ca.crt -m '{"_type":"cmd","action":"reportLocation"}'


# Nmap
https://home-assistant.io/components/device_tracker.nmap_tracker/

Rastrea la red en busca de dispositivos para saber quien está en casa (conectado a la wifi)

Me falla


# Bluetooth

device_tracker:
# este solo para BLE. Parece que se pega un poco con el ble monitor.
# Tengo que ejecutar a veces "hciconfig hci0 reset" (https://github.com/home-assistant/core/issues/17118#issuecomment-427543608(
- platform: bluetooth_le_tracker
  track_new_devices: true

# este me daba problemas en una raspi zeroW2, me tira paquetes ping
- platform: bluetooth_tracker

