https://medium.com/@benmeier_/a-quick-minimal-ipvs-load-balancer-demo-d5cc42d0deb4

Balanceador TCP integrado en el kernel de Linux.

Estadísticas:
sudo ipvsadm -L -n --stats --rate
  resumen del estado hasta ahora

sudo ipvsadm -L -n --rate
  esto nos da una visión de valores/seg



Ejemplo de un balanceador round-robin TCP:

Definimos la VIP:
sudo ipvsadm -A -t 192.168.2.17:7000 -s rr
  -A add virtual service

Agregamos los servers que contestarán:
sudo ipvsadm -a -t 192.168.2.17:7000 -r 192.168.2.17:7001 -m
sudo ipvsadm -a -t 192.168.2.17:7000 -r 192.168.2.17:7002 -m
  -a add real server


sudo ipvsadm -C
  borrar todas las configs

Se puede poner un balanceo con pesos.

No tiene health checks, tendríamos que implementarlo a mano.


# Internals
/proc/net/ip_vs_stats
