# Naming convention
httpd.service
sshd.socket
dev-hugepages.mount

# Service
Daemons, etc

# Socket
internet, udp, fifo, etc
xinetd replacement

# Target
logical grouping of units (replaces runlevels)

# Devices (udev)
Gracias a udev se generan automaticamente las units
Se pueden usar como dependencias.

# Mounts, automounts y swap
/etc/fstab
.mount y .swap se generan automáticamente

# Snapshot

