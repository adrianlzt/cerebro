# btlewrap
https://pypi.org/project/btlewrap/
Bluetooth LowEnergy wrapper for different python backends. This gives you a nice API so that you can use different Bluetooth implementations on different platforms.

Lo usan aqui para obtener info de los termómetros de xiaomi https://github.com/ratcashdev/mitemp/blob/master/mitemp_bt/mitemp_bt_poller.py

btlewrap recomienda usar https://github.com/IanHarvey/bluepy
Pero también puede usar bluez



# bleak
https://github.com/hbldh/bleak

Activo.
Hace uso de bluez
Parece que se conecta via dbus
Tiene pinta de ser la mejor elección.
Solo cliente.

Ejemplo escaneando devices y conectando al primero que ofrezca UART
https://github.com/hbldh/bleak/blob/master/examples/uart_service.py

Ejemplo que envia un comando a un device determinado y espera por la respuesta (UART)
https://gist.github.com/cac897b1653a2235a98024036c17afa8

device por mac
device = await BleakScanner.find_device_by_address(BLE_ADDRESS, timeout=20.0)

Reintentar los errores de DBus
    for _ in range(5):
        try:
            asyncio.run(uart_terminal())
        except BleakDBusError:
            print("DBus error, retrying...")
            sleep(0.2)
            continue





# pybluez
https://pybluez.readthedocs.io/en/latest/


# gattlib
https://github.com/oscaracena/pygattlib

pip install gattlib

Me da problemas con la versión de boost
gattlib.cpython-39-x86_64-linux-gnu.so
Busca libboost_python39.so.1.75.0 pero yo tengo la 1.76

Instalando desde AUR si funciona.



from gattlib import GATTRequester
req = GATTRequester("20:C3:8F:8A:5B:EA")
req.discover_characteristics()

No traduce UUIDs a su significado, lo podemos ver en wireshark

Se usa el handle en valor decimal:
req.read_by_handle(22)

O el uuid:


# bluepy
https://github.com/IanHarvey/bluepy
Python interface to Bluetooth LE on Linux

Parece un poco abandonada
La lib de python lo que hace es llamar a un programa escrito en c del mismo repo.

No pude usarlo para extraer info de DalyBMS, no me dejaba enviar un "write command" y obtener la respuesta (en wireshark se veía, pero no llegaba al callback).
Si podía hacer un "REQUEST COMMAND" y obtener respuesta, pero daly contestaba distinto en ese caso.


Escaner un device y obtener el mapeo de UUID a handles:

from bluepy.btle import Peripheral
mac = "26:24:21:21:20:1C"
peripheral = Peripheral(mac)
chars = peripheral.getCharacteristics()
for c in chars:
    print(f"uuid: {c.uuid}, handle: {c.getHandle()}")
    #descrs = c.getDescriptors()
    #for d in descrs:
    #    print(f"dscriptor: {d.uuid}")

