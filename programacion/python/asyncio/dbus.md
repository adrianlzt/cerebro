https://python-dbus-next.readthedocs.io/en/latest/index.html
https://python-dbus-next.readthedocs.io/en/latest/message-bus/aio-message-bus.html

pip3 install dbus-next


Si queremos conectar al bus del sistema:
bus = await MessageBus(bus_type=BusType.SYSTEM).connect()

Si queremos conectar al bus del usuario (current graphical user session):
bus = await MessageBus().connect()

Comunicándonos con org.freedesktop.timesync1 con el formato low level
Ha sido util comparar lo que veía en "sudo busctl monitor org.freedesktop.timesync1" entre este programa y el oficial de timedatectl.

async def get_ntp_offset_low_level():
    bus = await MessageBus(bus_type=BusType.SYSTEM).connect()

    reply = await bus.call(
        Message(destination='org.freedesktop.timesync1',
                path='/org/freedesktop/timesync1',
                interface='org.freedesktop.DBus.Properties',
                member='Get',
                signature='ss',
                body=["org.freedesktop.timesync1.Manager", "NTPMessage"]))

    if reply.message_type == MessageType.ERROR:
        raise Exception(reply.body[0])

    print(reply.body[0].signature)
    print(reply.body[0].value)
