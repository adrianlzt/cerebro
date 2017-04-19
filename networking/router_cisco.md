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

Escribir un fichero (usando tclsh)
http://ccie.floorripper.com/index.php/Blog:Main_Page/write_and_edit_text_files_on_the_cisco_router_flash
tclsh
puts [open "flash:test.cfg" w+] {
linea
otra linea
}
tclquit


# Interfaces
sh ip interface brief
sh interfaces Vlan 101 ?


# Configuracion
Mostrar:
show running-config

show running-config interface Vlan 101


Para quitar una conf:
no xxxx
Pondremos lo mismo que hemos escrito pero con un "no" delante.


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

## Mostrar
show ip access-list

## Comentarios
Podemos poner el comando "remark" para poner comentarios en la ACL. Ejemplo
ip access-list extended telnetting
 remark Do not allow host1 subnet to telnet out
 deny tcp host 172.16.2.88 any eq telnet


## Crear
http://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_data_acl/configuration/xe-3s/sec-data-acl-xe-3s-book/sec-create-ip-apply.html
Ejemplo creando una ACL para bloquear puerto 53 (no seria necesario bloquear el TCP/53) y aplicandola sobre una interfaz para el trafico de entrada.

conf term
ip access-list extended Block-DNS-From-The-Internet
  deny udp any any eq 53
  deny tcp any any eq 53
  permit ip any any
end

conf term
interface NOMBREINTERFAZ NUMERO
ip access-group Block-DNS-From-The-Internet in
end


Quitar ACL de una interfaz
conf term
interface NOMBREINTERFAZ NUMERO
ip access-group Block-DNS-From-The-Internet in
end

## Borrar
CUIDADO! no borrar una ACL sin antes quitarla de las interfaces, bloquearemos todo el trafico.

no ip access-list extended Block-DNS-From-The-Internet





# Debug
http://www.techrepublic.com/blog/data-center/troubleshoot-cisco-routers-and-switches-using-the-debug-commands/

Activar debug de un modulo, por ejemplo de las dns:
debug domain

Mostrar debugs activos
sh debug

Quitar todos los debug
u all

Mostrar configuracion de como se logeua
sh logging
  por defecto se logueara a la consola

Si hemos conectado por telnet, podemos activar nuestra terminal como si fuese la consola para recibir las trazas de debug:
terminal monitor

Con "sh log" veremos que aparece una linea tipo:
    Monitor logging: level debugging, 3 messages logged, xml disabled,
                     filtering disabled
        Logging to: vty131(3)

Para pararlo
terminal no monitor


https://cway.cisco.com/go/sa/
Cisco CLI analyzer
Programa para windows o macos para conectar con los routers y que nos realiza tareas automaticas de análisis


Extraer datos a traves de telnet.
Enviamos la secuencia de comandos a telnet y almacenamos la salida en un fichero
(echo "USER"; echo 'PASS'; echo "term len 0"; echo "show version"; echo "q"; sleep 3) | telnet 10.0.0.1 > out.txt


# DNS
http://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dns/configuration/15-mt/dns-15-mt-book/dns-config-dns.html
Activar servidor dns
conf term
ip dns server
end
testear que funciona
write

Reenviar peticiones a 8.8.8.8
ip dns view default
 dns forwarder 8.8.8.8

Agregar una resolución a mano:
ip host db.example.com 10.0.0.6

Mirar hosts definidos
show hosts

Ejecutar comando "host" (nslookup/dig).
Tenemos que meter un script tcl (en este dir host.tcl)
origen: https://supportforums.cisco.com/discussion/10406166/can-ios-do-nslookup
Podemos meterlo con copy&paste (mirar en la sección ficheros)
tclsh flash:host.tcl host.company.com [SERVERDNS]




# Failover / HSRP
Dos routers en activo / pasivo compartiendo una IP virtual.
El que tiene más peso es el activo.
Si el pasivo deja de recibir "ack" le pone activo.
Funciona decidiendo quien contesta el arping (hay una MAC virtual)

Una conf de ejemplo (http://www.sharontools.com/online-lab/):
interface Vlan101
 description LAN-101
 ip address 10.0.101.252 255.255.255.0
 standby 101 ip 10.0.101.254
 standby 101 preempt delay minimum 40

interface Vlan101
 description LAN-101
 ip address 10.0.101.251 255.255.255.0
 standby 101 ip 10.0.101.254
 standby 101 priority 150
 standby 101 preempt delay minimum 40






# Errores
Puerto flapeando? mirar show log

Muchos NAT montados? Tal vez demasiados procesos de NAT?

DNS server cargando la CPU
https://www.reddit.com/r/Cisco/comments/3dxo3w/cisco_1941_dns_causing_high_cpu_usage/
Acceso externo?

Troubleshooting High CPU Utilization on Cisco Routers
http://www.cisco.com/c/en/us/support/docs/routers/10000-series-routers/15095-highcpu.html




# Dudas
como parar un servicio? por ejemplo, si el dns esta consumiendo mucho, se puede reiniciar o parar?

Como ver el numero de peticiones que esta recibiendo el dns por segundo?
