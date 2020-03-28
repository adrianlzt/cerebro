fosdem 2020 dbus go

# godbus/bus

conn,_ := dbus.SessionBus()
obj := conn.Object("org.freedesktop.DBus", "/")
call := obj.Call("org.freedesktop.DBus.ListNAmes", 0)
...


Se usa mucho reflection, puede causar panics fácilmente.


Para implementar funciones tenemos que exportar los methods (XML) y luego implementarlos.


# coreos/go-systemd
Tienen funciones para hablar con systemd.


Transient unit.
Podemos ejecutar una "transient unit" (como systemd-run)
