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
sh int summary
  tabla con paquetes enviados, recibidos, tasas de transmision, etc
  limpiar los contadores: clear counters gigabitEthernet 0/2
sh interfaces Vlan 101 ?

Mostrar solo el rate de los ultimos 5 minutos:
sh int GigabitEthernet 0/0 | i rate



# Configuracion
Mostrar:
show running-config

Si queremos mostrar toda la config de una sola vez (sin pager): terminal length 0

show running-config interface Vlan 101


Para quitar una conf:
no xxxx
Pondremos lo mismo que hemos escrito pero con un "no" delante.


# grep / ex / in
sh version | in XX
  es como "grep XX"

sh processes cpu | ex 0.0
  es como "grep -v 0.0"

# beg / begin
sh conf | beg pubkey
Empezar a mostrar el output por la expr reg que le pasemos


# uptime
show version

# CPU
show processes cpu history
show processes cpu
sh processes cpu | ex 0.0
show processes cpu sorted

# Memoria
sh mem statistics
show mem ?

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
https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html
https://www.cisco.com/c/es_mx/support/docs/ip/access-lists/26448-ACLsamples.pdf
http://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html
http://www.cisco.com/c/en/us/support/docs/ip/access-lists/44541-tacl.html#ex
http://web.cecs.pdx.edu/~jrb/netsec/handouts/router.acls/ciscodeny.txt
Ejemplos típicos.

Cada interfaz puede tener dos access-list, una de entrada y otra de salida.
La primera regla que haga match será la usada (el resto se ignorarán).
Si no se hace match, se bloquea por defecto.

## Mostrar
show ip access-list

ACL de una interfaz:
ip access-lists interface gigabitEthernet 0/0


## Comentarios
Podemos poner el comando "remark" para poner comentarios en la ACL. Ejemplo
ip access-list extended telnetting
 remark Do not allow host1 subnet to telnet out
 deny tcp host 172.16.2.88 any eq telnet

Los remarks no se muestran con "sh access-list", pero si en "sh running-config".
Usar por ejemplo como "sh running-config | be NombreACL"


## Crear
http://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_data_acl/configuration/xe-3s/sec-data-acl-xe-3s-book/sec-create-ip-apply.html
Ejemplo creando una ACL para bloquear puerto 53 (no seria necesario bloquear el TCP/53) y aplicandola sobre una interfaz para el trafico de entrada.

conf term
ip access-list extended Block-DNS-From-The-Internet
  deny udp any any eq 53
  deny tcp any any eq 53
  permit ip any any
end

Cada regla que metemos se le va dando un número incremental por 10. La primera regla tendrá el 10, segunda el 20, etc. Esto lo hacemos para a posteriori poder colocar reglas entre medias.
Podemos también especificar ese número a mano: "100 permit ip any any".
Si editamos esa access-list, lo que vayamos añadiendo se pondrá al final. Si al final tenemos el "permit ip any any" no tendrá sentido que lo metamos luego, por lo que tendremos que forzar una posición.

conf term
interface NOMBREINTERFAZ NUMERO
ip access-group Block-DNS-From-The-Internet in
end


Quitar ACL de una interfaz
conf term
interface NOMBREINTERFAZ NUMERO
ip access-group Block-DNS-From-The-Internet in
end


Si queremos bloquear una IP, meter, antes de la regla "permit ip any any" una del tipo:
40 deny ip host 35.195.100.51 any


## Borrar
CUIDADO! no borrar una ACL sin antes quitarla de las interfaces, bloquearemos todo el trafico.

no ip access-list extended Block-DNS-From-The-Internet





# Debug
http://www.techrepublic.com/blog/data-center/troubleshoot-cisco-routers-and-switches-using-the-debug-commands/

Activar debug de un modulo, por ejemplo de las dns:
debug ip domain

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

Ver estadisticas:
show ip dns statistics

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



# Rutas
Mostrar
show ip route

Estaticas
ip route 10.8.0.0 255.255.255.0 10.0.1.28
ip route 10.8.0.0 255.255.255.0 GigabitEthernet0/1 10.0.1.28


# ACL / CBAC
https://www.youtube.com/watch?v=VfX0lA4BLIU
https://learningnetwork.cisco.com/thread/12997


# VPN
The Cisco IOS WebVPN/SSL VPN comprehensive feature set is available with Advanced Security images and higher starting with Cisco IOS Software Release 12.4(6)T (the Base IP image does not include this feature set). Cisco IOS WebVPN is not yet supported on a mainline train (General Deployment or Limited Deployment). All SSL VPN and Cisco IOS WebVPN features are included in a single, cost-effective license that can be purchased separately.

Parece que tenemos que tener una imagen distinta de la "ipbase" para poder tener VPN.


Para ver si nuestro router tiene soporte VPN https://supportforums.cisco.com/document/20571/how-determine-whether-router-has-vpn-modules-installed
Ejecutar "show version" y buscar algo tipo
1 Virtual Private Network (VPN) Module(s)




http://www.cisco.com/c/en/us/td/docs/routers/access/1900/software/configuration/guide/Software_Configuration/Secconf1.html#pgfId-1055505

Site-to-Site, conectar dos redes privadas
Remote access, usuarios puedan conectar a una red externa
  client mode: los clientes pueden acceder a la red privada. La red privada no puede acceder al cliente
  network extension mode: conexion client->red privada, red privada->cliente

After the IPSec server has been configured, a VPN connection can be created with minimal configuration on an IPSec client



Cisco 3900 series, 2900 series, and 1900 series ISRs can be also configured to act as Cisco Easy VPN servers
http://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_conn_esyvpn/configuration/15-mt/sec-easy-vpn-15-mt-book/sec-easy-vpn-srvr.html

Cisco IOS 15 Easy VPN
http://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_conn_esyvpn/configuration/15-mt/sec-easy-vpn-15-mt-book/sec-easy-vpn-srvr.html#GUID-4A711583-2E1A-48F4-A6E6-A0B50559340A
enable
conf term
aaa new-model
aaa authentication login VPN-USERS local
aaa authorization network VPN-GROUP local
username vpnuser password Mgi45ASd934nsf





Estas instrucciones parece que son para un modelo antiguo de IOS.
Mi router con IOS 15 falla al intentar ejecutar "crypto isakmp policy 10"
http://informatica.gonzalonazareno.org/plataforma/pluginfile.php/5220/mod_resource/content/1/CISCO_IOS_Easy_VPN_Server.pdf

Entrar en la configuracion
conf term

Crear un pool de IPs para los clientes VPN (en este caso permitimos 10 conex simultaneas):
ip local pool VPNPOOL 10.0.2.240 10.0.2.250

Configuramos AAA (Authentication, Authorization y Accounting)
aaa new-model
aaa authentication login VPN-USERS local
aaa authorization network VPN-GROUP local
username vpnuser password Mgi45ASd934nsf

Configurar las políticas IKE
crypto isakmp policy 10 
encryption aes 192 
hash sha
authentication pre-share
group 5
crypto isakmp client configuration group VPN-GROUP
key SECRETOCOMPATIDO
pool VPNPOOL
max-users 10
dns 192.168.1.1
netmask 255.255.255.0

Configurar la política IPSec
crypto ipsec transform-set VPNSET esp-aes esp-sha-hmac
crypto dynamic-map VPN-DYNAMIC 10
set transform-set VPNSET
reverse-route
crypto map VPN-STATIC client configuration address respond
crypto map VPN-STATIC client authentication list VPN-USERS
crypto map VPN-STATIC isakmp authorization list VPN-GROUP
crypto map VPN-STATIC 20 ipsec-isakmp dynamic VPN-DYNAMIC
interface serial 1/0
  aqui tenemos que elegir la interfaz por la que se conectaran los usuarios
crypto map VPN-STATIC
  Testear la vpn
write
  guardar la conf en la memoria permanente



# Lines / TTY / VTY
https://www.oreilly.com/library/view/cisco-ios-in/0596008694/ch04.html
Son las configuraciones para acceder al router. Pueden ser interfaces físicas (RS232) o virtuales (VTY, usando telnet, ssh, rlogin, etc).
Para las VTY se aplicará una access list, las reglas de firewall que la gestionan.
Podemos ver la configuración de estas reglas de acceso con:
sh access-lists

Con el comando "sh line" podemos ver las listas de acceso que se aplica a cada linea (AccO = access list output, AccI, access list input)



# SSH
https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_ssh/configuration/15-s/sec-usr-ssh-15-s-book/sec-ssh-term-line.html
A parte de activar ssh en alguna de las líneas, para poder usarlo tenemos que tener activado el servidor.
Chequeamos su estado con:
ip show ssh

Si nos da el error:
Please create RSA keys to enable SSH

Generar las keys con:
crypto key generate rsa usage-keys label router-key
  How many bits in the modulus [512]: 1024


## Meter pub keys para acceder
https://nsrc.org/workshops/2016/apricot2016/raw-attachment/wiki/Track5Wireless/cisco-ssh-auth.htm
fold -b -w 72 ~/.ssh/id_rsa.pub
  esto sera lo que copiaremos (cisco no admite lineas largas)

conf t
ip ssh pubkey-chain
username sshadmin
  este debera ser el usuario con el que hacemos login en el router via ssh
key-string
<< paste your multi-line public key here >>
exit

Comprobar con
show run | beg pubkey


Error al conectar que dice: "Invalid key length"
Tenemos que crear una clave rsa mas larga y usarla en el server ssh:
conf t
crypto key generate rsa modulus 2048
ip ssh rsa keypair-name nombre
  "nombre" sera el nombre que nos haya dicho al generar la clave rsa

Error: "Unable to negotiate with 10.0.2.51 port 22: no matching cipher found. Their offer: aes128-cbc,3des-cbc,aes192-cbc,aes256-cbc"
ssh -c 3des-cbc IP



## SSH client
Podemos hacer ssh desde dentro del router:
ssh HOST


# Netstat
sh control-plane host open-ports
sh tcp brief all | in LISTEN
  puertos abiertos

sh tcp
  conex establecidas

sh tcp brief numeric
  salida tipo netstat

sh udp
  tabla con las conex udp

Detalle de conexiones por PID
sh socket
sh socket PID detail



# Monitor / tcpdump / capture
https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/epc/command/epc-cr-book/epc-cr-m1.html
https://community.cisco.com/t5/routing/ios-packet-capture-help-needed/td-p/1337577
https://www.cisco.com/c/en/us/support/docs/ios-nx-os-software/ios-embedded-packet-capture/116045-productconfig-epc-00.html
http://www.firewall.cx/cisco-technical-knowledgebase/cisco-routers/1089-cisco-router-embedded-packet-capture-configuration-usage-troubleshooting-exporting.html

Creamos el buffer donde almacenar la info:
monitor capture buffer NOMBREBUFFER
  por defecto guarda 1M con elementos de 9.5kB. Linnear buffer
  podemos exportarlo en PCAP, poner al final: export DONDE
    donde puede ser la memoria flash, ftp, http, scp, etc

Creamos el punto de captura (en que interfaz):
monitor capture point ip cef NOMBREPUNTO GigabitEthernet 0/0 both

Unimos el punto de captura con el buffer:
monitor capture point associate NOMBREPUNTO NOMBREBUFFER

Aplicar filtro (opcional) (va aqui?):
monitor capture match ...

Empezamos la captura:
monitor capture point start NOMBREPUNTO

Parar la captura:
monitor capture point stop NOMBREPUNTO

Ver los datos:
show monitor capture buffer NOMBREBUFFER dump
  podemos intentar copiar lo que vemos a un fichero de texto y pasarle un par de scripts para convertirlo a pcap (si no podemos/queremos hacer el export)
  https://github.com/mad-ady/ciscoText2pcap

Exportar los datos en pcap:
monitor capture buffer NOMBREBUFFER export ...
monitor capture buffer NOMBREBUFFER export tftp://10.0.1.7/picorouter1.pcap
  no se puede cambiar el puerto (fallara si intentamos hacer tftp://a.b.c.d:nn/)
  server tftp con docker: docker run -v "/tmp/tftp:/var/tftpboot" --rm -it --net host pghalliday/tftp --secure /var/tftpboot -L -c
  no funciona? tal vez configurar la interfaz de salida de tftp? ip tftp source-interface gigabitEthernet 0/1


Ver puntos configurados:
sh monitor capture point all

Ver buffers configurados:
sh monitor capture buffer all parameters


Borrar punto de captura y buffer:
no capture point ip cef NOMBREPUNTO GigabitEthernet 0/0 both
no monitor capture buffer NOMBREBUFFER



# SNMP
Chequear si lo estamos exponiendo a internet (bloquear con la ACL de entrada de internet)
Cambiar la community para que no use la de por defecto (public)
conf term
  snmp-server community otronombre ro
  no snmp-server community public




# Errores
Puerto flapeando? mirar show log

Muchos NAT montados? Tal vez demasiados procesos de NAT?

DNS server cargando la CPU
https://www.reddit.com/r/Cisco/comments/3dxo3w/cisco_1941_dns_causing_high_cpu_usage/
Acceso externo?

Troubleshooting High CPU Utilization on Cisco Routers
http://www.cisco.com/c/en/us/support/docs/routers/10000-series-routers/15095-highcpu.html

DNS no funcionando.
El router no contestaba a las dns aunque se veia el puerto 53/tcp abierto.
"reiniciar" el server dns con:
no ip dns server
ip dns server





# Dudas
como parar un servicio? por ejemplo, si el dns esta consumiendo mucho, se puede reiniciar o parar?

Como ver el numero de peticiones que esta recibiendo el dns por segundo?
