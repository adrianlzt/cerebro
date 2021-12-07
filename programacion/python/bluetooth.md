
https://pypi.org/project/btlewrap/
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
