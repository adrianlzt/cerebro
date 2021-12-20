Ejemplo de código BLE
https://github.com/2black0/MicroPython-ESP32-BLE/blob/main/main.py

Ese ejemplo más simplificado
https://gist.github.com/adrianlzt/0ae7bc2ab9ef4de332d5be86f88456ef


# asyncio
Parece que no funciona bien BLE+uasyncio
https://github.com/micropython/micropython/pull/7046
https://github.com/micropython/micropython/issues/6601


# Errores

## OSError: -18
https://github.com/micropython/micropython/issues/7130
Parece que viene de intentar enviar un advertising payload de más de 31 bytes
