https://python-dbus-next.readthedocs.io/en/latest/index.html
https://python-dbus-next.readthedocs.io/en/latest/message-bus/aio-message-bus.html

pip3 install dbus-next


Ejemplo tal vez no válido, generado con github copilot
async def get_ntp_offset() -> int:
    """
    Use DBUS to communicate with org.freedesktop.timesync1 and get the time offset
    """
    try:
        bus = await aio.DBus.connect()
        obj = bus.get_object('org.freedesktop.timesync1', '/org/freedesktop/timesync1')
        timesync = dbus.Interface(obj, 'org.freedesktop.timesync1')
        offset = await timesync.GetTime()
        return offset
    except Exception as ex:
        logger.error(f'Error getting ntp offset: {ex}')
        return 0

