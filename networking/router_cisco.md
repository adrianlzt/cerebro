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


# Ficheros
http://www.cisco.com/c/en/us/td/docs/wireless/access_point/12-3_8_JA/configuration/guide/1238jasc/s38mfw.html

cd
pwd
mkdir
more
dir
  mostrar contenido directorio

show file systems
  parecido a df

show file information FICHERO
  como file FICHERO

show file descriptors
  para ver ficheros abiertos

Se pueden copiar ficheros con ftp, tftp, scp:
http://www.cisco.com/c/en/us/td/docs/wireless/access_point/12-3_8_JA/configuration/guide/1238jasc/s38mfw.html#wp1035113
copy system:running-config ftp://netadmin1:mypass@172.16.101.101/ap2-confg
copy ftp://netadmin1:mypass@172.16.101.101/host1-confg system:running-config
copy system:running-config tftp://172.16.2.155/tokyo-confg
copy c2900-universalk9-mz.SPA.151-4.M8.bin tftp://10.0.1.17/c2900-universalk9-mz.SPA.151-4.M8.bin
  en el servidor tftp ya debe existir un fichero vacio con ese nombre y permisos 777 (los permisos por si acaso)


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
show processes cpu sorted

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



# ACLs / listas de control de acceso
http://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html
http://www.cisco.com/c/en/us/support/docs/ip/access-lists/44541-tacl.html#ex
http://web.cecs.pdx.edu/~jrb/netsec/handouts/router.acls/ciscodeny.txt
Ejemplos típicos.



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
