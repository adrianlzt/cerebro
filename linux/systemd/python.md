https://github.com/systemd/python-systemd
https://www.freedesktop.org/software/systemd/python-systemd/

Si quermos controlar los servicios podemos hacerlo con dbus
https://dbus.freedesktop.org/doc/dbus-python/doc/tutorial.html


busctl --user tree ...
busctl --user introspect ...



https://zignar.net/2014/09/08/getting-started-with-dbus-python-systemd/
from pydbus import SystemBus
bus = SystemBus()
systemd = bus.get('org.freedesktop.systemd1')
unit = systemd.LoadUnit('MISERVICIO.service')
svc = bus.get('.systemd1', unit)
svc.Get('org.freedesktop.systemd1.Unit', 'ActiveState')


>>> bus.get('.systemd1', systemd.LoadUnit('vpn-dsn.service')).Get('org.freedesktop.systemd1.Unit', 'ActiveState')
'active'


Para comprobar si existe
>>> bus.get('.systemd1', systemd.LoadUnit('noexiste123.service')).Get('org.freedesktop.systemd1.Unit', 'LoadState')
'not-found'

