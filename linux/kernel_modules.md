Listar
lsmod

Cargar module
modprobe nombre

Quitar module:
modprobe -r nombre


Cargar un módulo en el arranque:
echo "rbd" > /etc/modules-load.d/ceph-rbd.conf
La systemd unit systemd-modules-load.service se encargará de cargar los módulos puestos en /etc/modules-load.d/*.conf
