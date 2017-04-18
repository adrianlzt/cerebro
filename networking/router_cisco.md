# Doc
Obtener la versión del iOS y buscar su command reference

15.4: http://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-15-4m-t/products-command-reference-list.html

# Ver version especifica y version del software
show version

# Navegar
sh -> show
show ?
  lista de que puedes meter (eso para todos los comandos)

s?
  comandos que pueden completar

Tab completa si puede (si no probar "?")

exit para salir al nivel superior


# Configuracion
Mostrar:
show running-config

# grep / ex / in
sh version | in XX
  es como "grep XX"

sh processes cpu | ex 0.0
  es como "grep -v 0.0"

# uptime
show version

# CPU
show processes cpu history
show processes cpu
sh processes cpu | ex 0.0

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


configure terminal
ip nat inside source static tcp 10.0.1.18 443 20.15.28.5 443 extendable
end
Testear que funciona
write



# Debug
http://www.techrepublic.com/blog/data-center/troubleshoot-cisco-routers-and-switches-using-the-debug-commands/

Activar debug de un modulo, por ejemplo de las dns:
debug domain

Mostrar debugs activos
sh debug

Mostrar trazas
sh logging

https://cway.cisco.com/go/sa/
Cisco CLI analyzer
Programa para windows o macos para conectar con los routers y que nos realiza tareas automaticas de análisis


Extraer datos a traves de telnet.
Enviamos la secuencia de comandos a telnet y almacenamos la salida en un fichero
(echo "USER"; echo 'PASS'; echo "term len 0"; echo "show version"; echo "q"; sleep 3) | telnet 10.0.0.1 > out.txt



# Failover / HSRP
Dos routers en activo / pasivo compartiendo una IP virtual.
El que tiene más peso es el activo.
Si el pasivo deja de recibir "ack" le pone activo.
Funciona decidiendo quien contesta el arping (hay una MAC virtual)




# Errores
Puerto flapeando? mirar show log

Muchos NAT montados? Tal vez demasiados procesos de NAT?

DNS server cargando la CPU
https://www.reddit.com/r/Cisco/comments/3dxo3w/cisco_1941_dns_causing_high_cpu_usage/
Acceso externo?

Troubleshooting High CPU Utilization on Cisco Routers
http://www.cisco.com/c/en/us/support/docs/routers/10000-series-routers/15095-highcpu.html
