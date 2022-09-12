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


# Dump copy export configuration
## asa
https://console.kim.sg/backup-cisco-running-config-via-ssh/
copy running-config scp:\\192.168.1.2



# Interfaces
sh ip interface brief
  intefaces, nombres, ips, levantadas

sh int summary
  tabla con paquetes enviados, recibidos, tasas de transmision, etc
  limpiar los contadores: clear counters gigabitEthernet 0/2

sh interfaces Vlan 101 ?

Mostrar solo el rate de los ultimos 5 minutos:
sh int GigabitEthernet 0/0 | i rate




# Configuracion
Config básica de un router:
https://www.cisco.com/c/en/us/td/docs/routers/access/800M/software/800MSCG/routconf.html
hostname
password de acceso
interfaces
command-line-access
rutas estáticas
rutas dinámicas (RIP, EIGRP)

## Quitar resolución de nombres
Por defecto, si metemos una palabra no conocida, intentará hacer una resolución DNS.
Para evitarlo:
no ip domain-lookup

Si queremos cancelar una
Control+^

https://community.cisco.com/t5/switching/no-ip-domain-lookup/td-p/2705168
O mejor, configurar un server DNS:
ip name-server A.B.C.D

Y desactivar que cuaquier palabra no conocida se intente resolver:
line con 0
 transport preferred none
line aux 0
 transport preferred none
line vty 0 15
 transport preferred none


## Entrar en modo configuración
conf term

Con "exit" salimos una capa.
Con "end" salimos del "conf" completamente.

En algunos routers primero tendremos que habilitar el modo privilegiado (comando "enable").


## Mostrar
show running-config

Si queremos mostrar toda la config de una sola vez (sin pager): terminal length 0

show running-config interface Vlan 101


## Para quitar una conf
no xxxx
Pondremos lo mismo que hemos escrito pero con un "no" delante.


## Configurar una intefaz
conf term
interface FastEthernet 0/0
ip addr 10.0.0.1 255.255.255.0
no shutdown
end

Configurar varias interfaces de golpe (típico caso, VLANs en switches):
interface range eth2/0 - 2

Borrar (poner a default) una interfaz
conf term
default interface gi1/1


## Comentario
!



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

Limpiarlo:
clear log


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


## NAT en cisco ASA
https://www.packetswitch.co.uk/cisco-asa-nat-example/
https://ipwithease.com/dynamic-pat-configuration-on-cisco-asa/

https://www.cisco.com/c/en/us/support/docs/security/adaptive-security-appliance-asa-software/116154-qanda-ASA-00.html
Si configuramos un NAT en ASA, él contestará a las peticiones ARP para la IP que hayamos configurado.

### Dynamic-PAT (todos los clientes salen por cualquiera de las IPs públicas disponibles)

object network user-subnet
 subnet 10.10.60.0 255.255.255.0
 nat (USERS,OUTSIDE) dynamic interface

Ver estado:
show xlate

### NAT one-to-one.
Mapear la IP pública 6.11.34.134 puerto 80 a la IP interna 10.0.0.138 puerto 32080

object network k8s-ingress-public-external-ip
 host 6.11.34.134
!
object network k8s-ingress-public
 host 10.0.0.138
 nat (inside,outside) static k8s-ingress-public-external-ip service tcp 32080 www
!
access-list outside_acl_k8s_ingress_public extended permit tcp any object k8s-ingress-public eq 32080
! Esto permite introducir tráfico desde cualquier sitio hacia el objeto k8s-ingress-public al puerto 32080. Si quitamos el "eq 32080" será a todos los puertos
access-group outside_acl_k8s_ingress_public in interface outside
! aplicar esa access list a la entrada de tráfico de la interfaz outside


Si queremos comprobar si todo el flujo está permitido:
packet-tracer input OUTSIDE tcp 1.1.1.1 30000 6.11.34.134 http
  Comprobamos que la ip 1.1.1.1 usando el puerto 30000 puede atacar a la ip 6.11.34.134 (se entiende que una nuestra) al puerto http (80)



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
show access-list

Si queremos resetear los contadores:
clear access-list counters [NombreACL]

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
Ejemplo creando una ACL para bloquear puerto 53 y aplicandola sobre una interfaz para el trafico de entrada.

conf term
ip access-list extended Block-DNS-From-The-Internet
  deny udp any any eq 53
  deny tcp any any eq 53
  permit ip any any
end

Podemos añadir al final de las reglas "log" o "log-input" para que loguee cuando se bloquea un paquete (log-input nos dice el punto del paquete)

deny|permit tcp|udp source destination port


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



## ACL en ASA
ACLs on the ASA allow you to override the default security behavior which is as follows:
    Traffic that goes from a lower security interface is denied when it goes to a higher security interface.
    Traffic that goes from a higher security interface is allowed when it goes to a lower security interface.

Tenemos que crear ACLs y esas ACLs aplicarlas a las interfaces, en sentido entrante o saliente.
Esa aplicación se hace con access-group.

Para ver los access-groups configurados en la config run:
sh run access-group

Luego para ver el detalle de una ACL:
show access-list NOMBRE

Por defecto todas las ACLs terminan en deny, por lo que si un tráfico no matchea un ACL, será denegeado.

Usando el "packet-tracer", si vemos la regla "Implicit Rule" es que está haciendo ese drop by default.

Ejemplo de packet-tracer. Comprobamos si en la interface INSIDE la ip 10.0.0.1 con el pueto 43512 puede comunicarse con 10.5.0.50:80
packet-tracer input INSIDE tcp 10.0.0.1 43512 10.5.0.50 http


Por defecto también está capado el tráfico inter-interface e intra-interface (solo si tienen el mismo security-level):
Para permitirlo:
same-security-traffic permit inter-interface
same-security-traffic permit intra-interface

### packet-tracer

Tendremos que comprobar el tráfico en todas las interfaces. Tanto cuando el paquete entra como cuando sale, poniendo
las interfaces por las que pase.
Ejemplo, si tenemos INSIDE y OUTSIDE, para ver si un tráfico externo entra haremos:

packet-tracer input OUTSIDE tcp 1.1.1.1 30000 NUESTRA.IP.INTERNA http

Y para ver si sale:
packet-tracer input INSIDE tcp NUESTRA.IP.INTERNA 80 1.1.1.1 30000


Type: ACCESS-LIST
Subtype: log
Result: ALLOW
Config:
access-group outside_public in interface OUTSIDE
access-list outside_public extended permit tcp any host 1.2.4.5
Additional Information:
 Forward Flow based lookup yields rule:
 in  id=0x7f3dd370d2f0, priority=13, domain=permit, deny=false
        hits=10, user_data=0x7f3e2182b100, cs_id=0x0, use_real_addr, flags=0x0, protocol=6
        src ip/id=0.0.0.0, mask=0.0.0.0, port=0, tag=any
        dst ip/id=1.2.4.5, mask=255.255.255.255, port=0, tag=any, dscp=0x0
        input_ifc=OUTSIDE, output_ifc=any

Tenemos un tráfico desde cualquier sitio que quiere entrar a 1.2.4.5.
Ese tráfico está entrando por la interfaz OUTSIDE (input_ifc=OUTSIDE).
Como es input e interfaz OUTSIDE, la ACL mira el access-group para "in interface OUTSIDE".
Ahí encuentra un match "tcp any host 1.2.4.5", el paquete tcp viene de cualquier sitio (tcp any) y se dirige a la ip 1.2.4.5.
Como está a "permit", el result es ALLOW.




# Debug
http://www.techrepublic.com/blog/data-center/troubleshoot-cisco-routers-and-switches-using-the-debug-commands/

Activar debug de un modulo, por ejemplo de las dns:
debug ip domain
en otras versiones parece que es: debug domain

Mostrar debugs activos (tendre que activar el "terminal monitor" para que me aparezcan por pantalla)
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


## Debug paquetes de una ip en particular
https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html#anc10
Entre dos IPs:
R1(config)#access-list 199 permit tcp host 10.1.1.1 host 172.16.1.1
R1(config)#access-list 199 permit tcp host 172.16.1.1 host 10.1.1.1
R1(config)#end
R1#debug ip packet 199 detail

IP packet debugging is on (detailed) for access list 199



## Troubleshooting cisco asa
https://www.ciscolive.com/c/dam/r/ciscolive/us/docs/2018/pdf/BRKSEC-3020.pdf




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

ip route RED next_hop
  RED se define con IP+mask

Para añadir rutas a una VRF
ip route vrf Mgmt 0.0.0.0 0.0.0.0 172.30.6.24


## Rutas cisco ASA
show route
show run route



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

### Cisco ASA
https://calinradoni.github.io/pages/210406-ciscoasa-ssh-access-pk.html
username sshUser password password_for_sshUser privilege 15
username sshUser attributes
ssh authentication publickey BASE64-ENCODED-PUBLIC-KEY
exit

Si falla porque el base64 es muy largo, pegar el contenido de:
ssh-keygen -e -f ~/keys/asaAccessKey.pub
en:
ssh authentication pkf




## SSH client
Podemos hacer ssh desde dentro del router:
ssh HOST


# Netstat
sh control-plane host open-ports
sh tcp brief all | in LISTEN
  puertos abiertos

sh tcp
  conex establecidas
show local-host
  en ASA
show local-host
  en ASA

sh tcp brief numeric
  salida tipo netstat

sh udp
  tabla con las conex udp

Detalle de conexiones por PID
sh socket
sh socket PID detail



# ping
ping 10.0.0.1
  por defecto 5 paquetes

ping 10.0.0.1 repeat 1
  solo 1 paquete

Hacer una especie de curl, enviar paquetes SYN a 192.0.2.24:80 simulando ser 91.18.8.24 (usando los puertos 30000-30004)
ping tcp 192.0.2.24 80 source 91.18.8.24 30000



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
  En /tmp/tftp tendremos que crear un fichero con el mismo nombre que usemos en el export (picorouter1.pcap) con permisos 777.
  no funciona? configurar la interfaz de salida de tftp (mirar que la interfaz que ponemos sea la que debe usarse para conectar con la ip del tftp):
    conf term
    ip tftp source-interface gigabitEthernet 0/1

  Quitar al terminar


Ver puntos configurados:
sh monitor capture point all

Ver buffers configurados:
sh monitor capture buffer all parameters


Borrar punto de captura y buffer:
no monitor capture point ip cef NOMBREPUNTO GigabitEthernet 0/0 both
no monitor capture buffer NOMBREBUFFER


## Cisco ASA
https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-next-generation-firewalls/118097-configure-asa-00.html

Capturar tráfico desde una IP externa hacia cualquier sitio:
capture NOMBRE interface outside match ip 9.18.208.224 255.255.255.255 any

Para desactivarlo
no capture NOMBRE match ip 9.18.208.224 255.255.255.255 any


Ver que capturas tenemos:
show capture

Detalle:
show capture NOMBRE





# SNMP
Activar snmp:
conf term
  snmp-server community public ro

Chequear si lo estamos exponiendo a internet (bloquear con la ACL de entrada de internet)
Cambiar la community para que no use la de por defecto (public)
conf term
  snmp-server community otronombre ro
  no snmp-server community public

## ASA
https://www.networkstraining.com/how-to-configure-snmp-on-cisco-asa-5500-firewall/

snmp-server enable
snmp-server host inside 10.1.1.100 community somesecretword version 2c
snmp-server community somesecretword


# BGP
https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus6000/sw/unicast/6_x/cisco_n6k_layer3_ucast_cfg_rel_602_N2_1/l3_bgp.html
conf term
router bgp ASN
neighbor 10.0.0.7 remote-as 65000
end

sh ip route
  mirar si estamos cogiendo las rutas

write
  si es correcto, para persistir reinicios

## Cisco ASA
router bgp 65111
address-family ipv4
neighbor 192.0.2.10 remote-as 65211
neighbor 192.0.2.11 remote-as 65211
end

Estado (que IPs serán enrutadas porque nodos):
show bgp
show bgp summ
sh route bgp




# VLAN: configuración para routers
https://www.practicalnetworking.net/stand-alone/routing-between-vlans/

A este tipo de conf se le suele llamar Router on a Stick or One-armed Router.

Se usan subinterfaces, mismo puerto físico, pero distinta VLAN.
interface eth1/1.20
  encapsulation dot1Q 20
  ip address 10.0.20.1 255.255.255.0

Se crean añadiendo el sufijo .NN a una interfaz (se suele hacer coincidir con la VID).
Crear varias subinterfaces incrementa el riesgo de saturación del enlace.



# LLDP / xDP / CDP
## CDP
Activo por defecto

show cdp neighbors
  nos muestra los dispositivos que tenemos conectados via L2

show cdp neighbors detail
  para ver todo el detalle

show cdp interfaces
  podemos ver la configuración de cada interfaz.
  por defecto, mensajes cada 60"


Podemos desactivarlo, por ejemplo si tenemos dispositivos no confiables conectados:
no cdp
no cdp [interface]
  desactivarlo solo para una interfaz


## LLDP
https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/cether/configuration/15-mt/ce-15-mt-book/ce-lldp-multivend.html

No activo por defecto.
Parece que no está disponible en los routers (al menos no en un router 7200)
Si en los switches.

show lldp neighbours
show lldp
  info de la configuración

Activar:
conf term
lldp run
  por defecto envía cada 30"



# Agregación / LACP
https://www.cisco.com/c/en/us/td/docs/ios/12_2sb/feature/guide/gigeth.html

Agregar varias interfaces en una única virtual.
Las interfaces que agregemos deben estar "limpias", sin IPs ni VLANs (podemos hacerlo con "default interface XXX")

Crear un port-channel
conf term
interface port-channel 1
exit
interface Gi0/0
channel-group 1 mode active
exit
interface Gi0/1
channel-group 1 mode active
end

Si queremos configurar VLAN, IPs, etc lo haremos sobre la interfaz "port-channel 1".

Tenemos también que configurar los puertos remotos.
Si no, veremos mensajes avisándonos de que LACP no se activa porque el remoto no lo tiene:
%EC-5-L3DONTBNDL2: Gi1/0 suspended: LACP currently not enabled on the remote port.

LACP eligirá por que cable enviar el tráfico.
En caso de fallo de un cable, el tráfico se redirigirá de forma transparente por el otro.
Ese puerto se pondrá en "passive".

Estado:
https://www.reddit.com/r/Cisco/comments/3dxo3w/cisco_1941_dns_causing_high_cpu_usage/
Acceso externo?

Troubleshooting High CPU Utilization on Cisco Routers
http://www.cisco.com/c/en/us/support/docs/routers/10000-series-routers/15095-highcpu.html

DNS no funcionando.
El router no contestaba a las dns aunque se veia el puerto 53/tcp abierto.
"reiniciar" el server dns con:
conf term
no ip dns server
ip dns server





# cisco cli analyzer
https://cway.cisco.com/go/sa/
Cisco CLI analyzer
Programa para windows o macos para conectar con los routers y que nos realiza tareas automaticas de análisis


# Extraer datos a traves de telnet
Enviamos la secuencia de comandos a telnet y almacenamos la salida en un fichero
(echo "USER"; echo 'PASS'; echo "term len 0"; echo "show version"; echo "q"; sleep 3) | telnet 10.0.0.1 > out.txt




# Upgrade firmware
## Cisco ASA firewall
https://www.cisco.com/c/en/us/td/docs/security/asa/upgrade/asa-upgrade/asa-appliance-asav.html#ID-2152-00000110

Firmware: https://mega.nz/fm/SBszyKaR

Copiar la imagen:
copy ftp://jcrichton:aeryn@10.1.1.1/asa-9-12-1-smp-k8.bin disk0:/asa-9-12-1-smp-k8.bin

Acceder a la config:
configure terminal

Ver que está corriendo actualmente:
show running-config boot system

Desactivarlo:
no boot system disk0:/cdisk.bin
no boot system disk0:/asa931-smp-k8.bin

Configurar el nuevo firmware:
boot system disk0:/asa-9-12-1-smp-k8.bin

Guardar y recargar:
write
reload


# Reiniciar / reboot
enable
reload



# Cisco ASA ASP / accelerated security path
Paquetes que pueden ser descartados por distintas razones. En la web explican cada razón

https://www.cisco.com/c/en/us/td/docs/security/asa/asa-cli-reference/show_asp_drop_command_usage/show-asp-drop-command-usage.html

show asp drop

Para limpiar la tabla:
clear asp drop
# Dudas
como parar un servicio? por ejemplo, si el dns esta consumiendo mucho, se puede reiniciar o parar?

Como ver el numero de peticiones que esta recibiendo el dns por segundo?



# Cisco ASA ASDM
Interfaz web para configurar y administrar el ASA.

Activar (solo permitir acceso de esa red):
ASA(config)#aaa authentication http console LOCAL
ASA(config)#http server enable
ASA(config)#http 10.0.1.0 255.255.255.0 INSIDE

Necesitaremos también tener un usuario, posiblemente ya creado.

Accedemos por https:
https://10.0.1.1

Lo he conseguido ejecutar en un windows 10 con jre7, ASDM 7.5(2)153

Usando esta idea https://community.cisco.com/t5/network-security/asdm-on-ubuntu/m-p/4007044/highlight/true#M145740 (llevarnos el código java a linux) me falla con:
javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
Necesito importar el cert, lo cogemos de https://10.0.1.1
https://stackoverflow.com/questions/21076179/pkix-path-building-failed-and-unable-to-find-valid-certification-path-to-requ
Nada, ni con ese cert ni con el que se generó la primera vez al ejecutar asdm en windows.
Tal vez metiendo nosotros un cert en el dispositivo que esté aceptado por la ca del keytool de java funcionase.

Application Error: Cannot grant permissions to unsigned jars
Mirar:
https://techblog.jeppson.org/2018/01/fix-icedtea-cannot-grant-permissions-unsigned-jars-error/
https://unix.stackexchange.com/questions/143805/running-unsigned-javaws-code

Con esto falla algo de java, parece porque usa la versión de 64bits?
https://web.archive.org/web/20220808182716/https://noobient.com/2019/09/26/cisco-asdm-on-64-bit-ubuntu-18-04/
Pero seguramente me lleve al primera de los certificados de arriba
javaws -nosecurity https://10.0.2.1/admin/public/asdm.jnlp


## Actualiar ASDM
http://notthenetwork.me/blog/2012/04/02/how-to-upgrading-the-software-and-asdm-images-on-a-cisco-asa/

Ver versión funcionando
show asdm image

Ver versiones disponibles:
show flash | include asdm-645.bin


# Cisco asa thread detection
https://www.cisco.com/c/en/us/td/docs/security/asa/asa96/configuration/firewall/asa-96-firewall-config/conns-threat.html
show threat-detection rate


# Cisco ASA initial config
https://www.routerfreak.com/basic-configuration-tutorial-cisco-asa-5505-firewall/

Configurar interfaces.
