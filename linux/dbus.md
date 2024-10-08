dbus - event signalling that a dbus signal has been emitted

dbus-monitor: para ver que se está enviando

process      dbus-daemon       systemd (sd-bus)
   |              |                 |
   ---- (unix domain socket)---------

FOSDEM 2020 dbus go

# Address format

Un poco raro si estamos acostumbrado a web. Esto es más antiguo

Bus (address)
Connection (bus name), sería como el "DNS"
Object (path)
Interface (interface name)
Member (member name)

# Mensaje format

Es binario
Tiene tipos: struct, arrays, dict

# Enviar un mensaje

## gdbus

Parece más potente que dbus-send

Ejemplo:

```bash
gdbus call --session \
           --dest org.freedesktop.Notifications \
           --object-path /org/freedesktop/Notifications \
           --method org.freedesktop.Notifications.Notify \
           my_app_name \
           42 \
           gtk-dialog-info \
           "The Summary" \
           "Here's the body of the notification" \
           [] \
           {} \
           5000
```

## dbus-send

dbus-send --session --print-reply --type=method_call --dest=orf.freedesktop.Dbug / ...

Enviar un mensaje al dbus de nuestra sesión. En este caso, solicitando que se levante el servicio org.freedesktop.secrets
dbus-send  --print-reply --dest=org.freedesktop.DBus /org/freedesktop/DBus org.freedesktop.DBus.StartServiceByName string:org.freedesktop.secrets uint32:0

## busctl

Para inspeccionar que tenemos

busctl list
  nos saca los "peers" del bus, tanto de nuestro usuario como de root

busctl tree
  nos muestra los services y sus objectos

busctl introspect org.freedesktop.timesync1 /org/freedesktop/timesync1
  ver propiedades de un service/object

busctl get-property org.freedesktop.timesync1 /org/freedesktop/timesync1 org.freedesktop.timesync1.Manager NTPMessage
  obtener una propiedad

## Obtener mensajes

Ejemplo usando busctl para ver mensajes enviados al servicio de time sync
busctl monitor org.freedesktop.timesync1

Ejemplo obteniendo notificaciones:
dbus-monitor "interface='org.freedesktop.Notifications', member='Notify'"

## qdbus

También para obtener info del bus

qdbusviewer
  version x11

qdbus
  sin parámetros, nos dice que servicios están disponibles en el bus
  busctl list parece más potente

Enviar mensajes:
qdbus servicename path function parameters

# Signals

PubSub 1:N
Async

# Best practices

Buscar artículos:
"Chrome OS D-Bus best practices"
"How to version DBus interafaces" (creo que era así)

# Ver que proceso tiene registrado que servicio

Preguntar el PID de un servicio de DBUS, luego pasarlo a ps para obtener el nombre del proceso:
ps -ax -q $(dbus-send --session --print-reply --dest=org.freedesktop.DBus / org.freedesktop.DBus.GetConnectionUnixProcessID string:org.freedesktop.secrets | grep uint32 | awk '{print $2}')

rg org.freedesktop.Notifications /usr/share/dbus-1/services/

➜ cat /usr/share/dbus-1/services/org.freedesktop.secrets.service
[D-BUS Service]
Name=org.freedesktop.secrets
Exec=/usr/bin/gnome-keyring-daemon --start --foreground --components=secrets
