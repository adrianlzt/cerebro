# Doc
Obtener la versión del iOS y buscar su command reference

# Ver version especifica y version del software
show version

# Configuracion
Mostrar:
show running-config

# Saltar por los comandos
sh -> show
show ?
  lista de que puedes meter (eso para todos los comandos)

# grep / ex / in
sh version | in XX
  es como "grep XX"

sh processess cpu | ex 0.0
  es como "grep -v 0.0"

# uptime
show version

# CPU
show processess cpu history
show processess cpu

# Memoria
show mem

# Log
show log

# Configure
conf t
  confiurar el router
  el rest de conf * no se suelen utilizar

# Comentario
!

# exit
exit
  sales un dir hacia arriba


# NAT
sh ip nat translations
  nats actualmente funcionando, en uso.

Como configurar un router para añadir nat

Meter una regla para enrutar el trafico de la ip publica 20.15.28.5:443 a la interna 10.0.1.18:443


configure
ip nat inside source static tcp 10.0.1.18 443 20.15.28.5 443 extendable
end
Testear que funciona
write


# Failover / HSRP
Dos routers en activo / pasivo compartiendo una IP virtual.
El que tiene más peso es el activo.
Si el pasivo deja de recibir "ack" le pone activo.
Funciona decidiendo quien contesta el arping (hay una MAC virtual)

# Errores
Puerto flapeando? mirar show log

Muchos NAT montados? Tal vez demasiados procesos de NAT?
