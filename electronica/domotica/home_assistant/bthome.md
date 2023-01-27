https://bthome.io/

Estandar para hacer broadcasting de valores via BLE.


Librería para parsear trazas bthome
https://github.com/Bluetooth-Devices/bthome-ble


Ejemplo de código micropython implementando un sensor de temperatura y uno de peso:

```
data = b'\x02\x01\x06' # flags: BR/EDR Not Supported + LE General Discoverable Mode

data += b'\x0a' # length (type + pack)
data += b'\x16' # Type: Service Data - 16 bit UUID (0x16)
data += b'\xd2\xfc' # UUID 0xD2FC (reversed)
data += b'\x40' # no encryption, BTHome V2

data += b'\x02' # temperature measurement
data += pack('H', int(temperature * 100)) # little endian, 2500 * 0.01 = 25.00 C

data += b'\x06' # mass (kg)
data += pack('H', int(weight * 100)) # little endian, 8030 * 0.01 = 80.3kg
```

Ejemplo completo:
https://github.com/adrianlzt/BLE_balance/tree/feature/bthome
