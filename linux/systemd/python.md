https://github.com/systemd/python-systemd
https://www.freedesktop.org/software/systemd/python-systemd/

Si quermos controlar los servicios podemos hacerlo con dbus
https://dbus.freedesktop.org/doc/dbus-python/doc/tutorial.html


https://zignar.net/2014/09/08/getting-started-with-dbus-python-systemd/
from pydbus import SystemBus
bus = SystemBus()
systemd = bus.get('org.freedesktop.systemd1')
unit = systemd.LoadUnit('MISERVICIO.service')
svc = bus.get('.systemd1', unit)
svc.Get('org.freedesktop.systemd1.Unit', 'ActiveState')


>>> bus.get('.systemd1', systemd.LoadUnit('vpn-dsn.service')).Get('org.freedesktop.systemd1.Unit', 'ActiveState')
'active'
