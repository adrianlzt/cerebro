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

## dbus-send
dbus-send --session --print-reply --type=method_call --dest=orf.freedekstip.Dbug / ...

## busctl
Para inspeccionar que tenemos

busctl list
  nos saca los "peers" del bus, tanto de nuestro usuario como de root

## Obtener mensajes
Ejemplo usando busctl para ver mensajes enviados al servicio de time sync
busctl monitor org.freedesktop.timesync1

Ejemplo obteniendo notificaciones:
dbus-monitor "interface='org.freedesktop.Notifications', member='Notify'"

## qdbus
También para obtener info del bus

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
