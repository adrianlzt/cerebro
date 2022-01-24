Ejemplo de código BLE
https://github.com/2black0/MicroPython-ESP32-BLE/blob/main/main.py

Ese ejemplo más simplificado
https://gist.github.com/adrianlzt/0ae7bc2ab9ef4de332d5be86f88456ef

# Simulando un sensor xiaomi
Para usarlo con home assistant ble monitor

```
data = b'\x02\x01\x06' # flags: BR/EDR Not Supported + LE General Discoverable Mode

adstruct = b"\x16" # adstruct type
adstruct += b"\x95\xfe" # uuid 0xFE95, Xiaomi
adstruct += b"\x40\x59" # frctrl invertido, 0x5940, lo marco como no encriptado (el cuarto bit, empezando por el final), ni mac (50->40)
adstruct += b"\x8d\x0a" # device id, invertido, RTCGQ02LM
adstruct += pack('B', self.packet_id) # packet id

# adstruct motion payload
adstruct += b"\x03\x00" # obj0003 type (motion timer)
adstruct += b"\x01" # obj length
motion = randint(0,1)
adstruct += pack('B', motion) # motion, 1 = on, 0 = off

# adstruct button payload
adstruct += b"\x01\x10" # obj1001 type (button)
adstruct += b"\x03" # obj length
adstruct += b"\x00\x00" # button type + value
press = randint(0,1)
adstruct += pack('B', press) # press type: 0 = single press, 1 = double press, 5, short press, 6 = long press

# adstruct light payload
adstruct += b"\x18\x10" # obj1018 type (light)
adstruct += b"\x01" # obj length
light = randint(0,1)
adstruct += pack('B', light)

# adstruct prefijado con su size
payload = pack('B', len(adstruct)) + adstruct

data += payload

print(f"Advertiser {len(data)}: {data}")
self.ble.gap_advertise(config[ADVERTISMENT_US], bytearray(data))
```





# asyncio
Parece que no funciona bien BLE+uasyncio
https://github.com/micropython/micropython/pull/7046
https://github.com/micropython/micropython/issues/6601


# Errores

## OSError: -18
https://github.com/micropython/micropython/issues/7130
https://github.com/micropython/micropython/issues/5232
Parece que viene de intentar enviar un advertising payload de más de 31 bytes
