<http://www.cyberciti.biz/faq/howto-site-to-site-ipsec-vpn-between-cisco-openbsd-router-pfsense/>

strongswan vs libreswap
<https://serverfault.com/questions/173158/strongswan-vs-openswan/655752#655752>

Parece mejor strongswan. Aunque para rhel viene libreswan por defecto (pero strongswan está en epel).
strongswan tiene mejor documentación.
Usar strongswan

# IPSec

<https://networklessons.com/cisco/ccie-routing-switching/ipsec-internet-protocol-security>
Las capturas son de IKEv1.

<http://www.unixwiz.net/techtips/iguide-ipsec.html>
Detalles sobre el formato de los paquetes.

Dos fases para conectar:

- IKE Phase 1: negotiate about the encryption, authentication, hashing and other protocols that they want to use and some other parameters that are required. In this phase, an ISAKMP (Internet Security Association and Key Management Protocol) session is established. This is also called the ISAKMP tunnel or IKE phase 1 tunnel only used for management traffic. We use this tunnel as a secure method to establish the second tunnel called the IKE phase 2 tunnel or IPsec tunnel and for management traffic like keepalives.
- IKE Phase 2: IKE phase 2 tunnel (or IPsec tunnel) that we can use to protect our user data. This user data will be sent through the IKE phase 2 tunnel:

IKE builds the tunnels for us but it doesn’t authenticate or encrypt user data. We use two other protocols for this:

- AH (Authentication Header)
- ESP (Encapsulating Security Payload). Este es el único con ecnriptación y parece que el realmente usado.

Two different modes:

- Transport mode: se mete una cabecera entre la cabecera IP y la carga útil.
- Tunnel mode: se añade una nueva ip header y AH header antes de la ip header original.

Puertos:

- **UDP Port 500 (ISAKMP):** ISAKMP (Internet Security Association and Key Management Protocol) is used to establish and manage the Security Associations (SAs) that IPsec uses. Think of it as the "handshake" phase – setting up the secure tunnel. It negotiates things like encryption algorithms, authentication methods, and the lifetime of the connection.

- **UDP Port 4500 (NAT-Traversal):** Network Address Translation (NAT) is a common technique used in home and corporate networks. Since IPsec often needs to traverse NAT devices (routers), port 4500 is used to facilitate this process. It's specifically used for the IKE (Internet Key Exchange) phase, which is part of ISAKMP. If your IPsec tunnel needs to go through NAT devices, this port will be crucial for the connection to work.

## Establecimiento de la conexión

Captura de tráfico de un establecimiento de conexión: <https://www.cloudshark.org/captures/767a93d720ad>

El iniciador envía un primer paquete "IKE_SA_INIT" con los tipos de encriptación, hash, etc que soporta. También envía el intercambio de claves Diffie-Hellman e información para poder hacer NAT traversal.
El otro lado responde con un "IKE_SA_INIT" con los tipos que soporta.

Luego el iniciador envía un "IKE_AUTH" con las claves públicas y el otro lado responde con otro "IKE_AUTH" con las claves públicas.
Estos paquetes ya contienen información cifrada:

- identification: parece que suele usarse la IP pública o el FQDN
- authentication
- Security Association (SA): información sobre el cifrado a usar para ESP, encriptación, hash y extended sequence numbers.
- Traffic Selector initiator: las redes que se van a conectar
- Traffic Selector responder: las redes que se van a conectar

## Demystifying NAT Traversal In IPSEC VPN With Wireshark

<https://community.cisco.com/t5/security-blogs/demystifying-nat-traversal-in-ipsec-vpn-with-wireshark/ba-p/4524496>

# Python

Implementación de IPSec en python, para aprender como funciona: <https://github.com/qwj/python-vpn>

Los paquetes se muestran con un print, a parte de enviarse a la red:

```
ECHO 68.21.5.148 -> 172.30.0.4 Id=4 Seq=1 Data=b'*\xdc\x04g\x00\x00\x00\x00\xa0\xb6\x01\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./01234567'
TCP 68.21.5.148:47034 -> 172.30.0.4:80
```

<https://github.com/adrianlzt/python-vpn>
Algunas modificaciones para mostrar más información:

- datos para desencriptar el tráfico con wireshark
- mostrar los traffic selectors directamente
- habilitar tráfico ICMP (necesita ejecutarse como root)
- más prints que estaban comentados

# Linux

Libreswan/strongswan usan por debajo las políticas de IPsec sin el "ip routing".
Para ver esas políticas podemos usar:
ip xfrm policy # shows the established phase2 connections
ip xfrm state # shows the keys and bytes used for a phase2 connection
ip xfrm monitor # shows changes

En libreswan veo que crea una interfaz ip_vti0 que es donde vemos el tráfico con tcpdump.

Más info de como debugear: <https://debugging.works/blog/debugging-ipsec/>

Parece que también es posible forzar a que se cree una interfaz y se use el ip routing.
<https://libreswan.org/wiki/Route-based_XFRMi>

tcpdump parece que no puede ver el tráfico de salida por que:
On the right side (egress), since the packet is already encrypted by xfrm before reaching AF_PACKET, tcpdump can only see the encrypted result and isn't able to see the plain text version
<https://serverfault.com/a/1020769>

Truco para capturar el tráfico de salida: <https://serverfault.com/a/1069111>

```
iptables -I INPUT -m addrtype --dst-type LOCAL -m policy --pol ipsec --dir in -j NFLOG --nflog-group 5
iptables -I OUTPUT -m policy --pol ipsec --dir out -j NFLOG --nflog-group 5

tcpdump -s 0 -n -i nflog:5
```

# Nomenclaturas

## Mapeo entre DHn y Groupm

```
Groupe Diffie-Hellman 1 : groupe 768 bits
Groupe Diffie-Hellman 2 : groupe 1 024 bits
Groupe Diffie-Hellman 5 : groupe 1 536 bits
Groupe Diffie-Hellman 14 : groupe 2 048 bits
Groupe Diffie-Hellman 15 : groupe 3 072 bits
Groupe Diffie-Hellman 19 : groupe de courbe elliptique 256 bits
Groupe Diffie-Hellman 20 : groupe de courbe elliptique 384 bits
```

# Libreswan

Una vez tenemos establecida la conexión no veremos ninguna ruta ni interfaz nueva. Parece que el tráfico se enruta "mágicamente" para la red que tengamos seleccionada.

## Configuración

<https://libreswan.org/man/ipsec.conf.5.html>

Cuando libreswan habla de parte izquiera y derecha de la red, da igual que lado es cada uno.

### ip forward y NAT

Para que las máquinas del otro lado de la VPN puedan enrutar a la red local donde esté strongswan, necesitamos habilitar el ip forward y el NATeo:

```
sysctl -w net.ipv4.ip_forward=1
modprobe iptable_nat
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### Secrets

Si queremos una clave que matchee cualquier conexión:

```
%any %any : PSK "$psk"
```

Si queremos distintas, usaremos el formato:

```
IP_PUBLICA_ORIGEN IP_PUBLICA_DESTINO : PSK "mysecret"
```

### NAT

Si estamos dentras de NAT, en "left", tenemos que cambiarlo de:

```
left=%defaultroute
```

a nuestra ip interna de la LAN, por ejemplo:

```
left=10.0.0.5
```

Del manual:
If using IP addresses in combination with NAT, always use the actual local machine's (NATed) IP address, and if the remote (eg right=) is NATed as well, the remote's public (not NATed) IP address.

Tener en cuenta que necesitamos los puertos abiertos en el firewall de turno y los mismos puertos reenviados desde el router si tenemos una NAT.

### Azure VPN Gateway

Conectar libreswan al VPN Gateway de Azure
<https://reinhardt.dev/posts/azure-vpn-using-libreswan/>
<https://blog.notnot.ninja/2020/09/19/azure-site-to-site-vpn/>

Otro ejemplo, parece que más moderno:
<https://libreswan.org/wiki/Microsoft_Azure_configuration>

Configuración final que usé:

```
conn conn2AzureRouteBasedGW
        authby=secret
        auto=start
        dpdaction=restart
        dpddelay=30

        ikev2=yes
        ike=aes256-sha256
        ikelifetime=10800s

        keyingtries=3
        salifetime=3600s
        type=tunnel

        #pfs=yes
        pfs=no

        phase2alg=aes256-sha256

        left=%defaultroute
        leftid=40.113.59.156
        leftsubnets=10.0.0.0/24

        right=20.240.192.55
        rightid=20.240.192.55
        rightsubnets=10.240.10.0/24
```

En la `Connection` de Azure usé una Custom IPsec / IKE policy.
Esta configuración la usamos porque era la que nos solicitaban desde un cliente.

IKE Phase 1

- Encryption: AES256
- Integrity/PRF: SHA256
- DH Group: DHGroup14

IKE Phase 2(IPsec)

- IPsec Encryption: AES256
- IPsec Integrity: SHA256
- PFS Group: None

Esta `Connection` también estaba enlazada con un _Local network gateway_ donde estaba configurada la IP del libreswan remoto y la subred remota que exponíamos.

Una vez conectado, tanto desde el lado de libreswan como desde azure podemos intercambiar datos.

## Comandos

Forzar a iniciar una conex. Es útil para poder ver posibles errores de la configuración.

```
ipsec auto --add conn2AzureRouteBasedGW
```

## Estado

ipsec showstates

Para una conexión establecida veía esto:

```
# ipsec showstates
000 #1: "conn2AzureRouteBasedGW/1x1":4500 STATE_V2_ESTABLISHED_IKE_SA (established IKE SA); REKEY in 9949s; REPLACE in 10796s; newest; idle;
000 #2: "conn2AzureRouteBasedGW/1x1":4500 STATE_V2_ESTABLISHED_CHILD_SA (established Child SA); LIVENESS in 26s; REKEY in 2959s; REPLACE in 3596s; newest; eroute owner; IKE SA #1; idle;
000 #2: "conn2AzureRouteBasedGW/1x1" esp.9894a50e@20.240.192.55 esp.84ac8cb5@10.0.0.5 tun.0@20.240.192.55 tun.0@10.0.0.5 Traffic: ESPin=0B ESPout=0B ESPmax=2^63B
```

Para saber si la conexión está establecida correctamente podemos hacer:

```
ipsec status | grep "Total IPsec"
```

Y debe devolver:

```
000 Total IPsec connections: loaded 1, active 1
```

## Troubleshooting

<https://debugging.works/blog/debugging-ipsec/>

Ejecutar:

```
ipsec verify
```

Si se queja de que los 'default/send_redirects' no están disabled, ejecutar:

```
for vpn in /proc/sys/net/ipv4/conf/*; do
    echo 0 > $vpn/accept_redirects;
    echo 0 > $vpn/send_redirects;
done
```

### STATE_V2_PARENT_I1: retransmission; will wait 0.5 seconds for response

El otro endpoint no está contestando.

### dropping unexpected IKE_SA_INIT message containing NO_PROPOSAL_CHOSEN notification; message payloads: N; missing payloads: SA,KE,Ni

Este error es al tener mal configurado el `ike`, el parámetro donde definimos la encriptación de IKE phase 1 (el ike phase 2 si está bien).

En el state veo:

```
# ipsec showstates
000 #2: "conn2AzureRouteBasedGW/1x1":500 STATE_V2_PARENT_I1 (sent IKE_SA_INIT request); RETRANSMIT in 27s; idle;
000 #2: pending CHILD SA for "conn2AzureRouteBasedGW/1x1"
```

### IKE_AUTH response contained the error notification NO_PROPOSAL_CHOSEN

Este error parece que sale si tenemos el `phase2alg` configurado distinto entre los dos dispositivos (la encriptación de IKE phase 2). La encriptación del phase1 si está bien.

El "showstates" no muestra nada.

### CREATE_CHILD_SA failed with error notification NO_PROPOSAL_CHOSEN

Comprobar que las subnets definidas a ambos lados son iguales.
Mirar parámetros leftsubnets y rightsubnets.

### No IKEv2 connection found with compatible Traffic Selectors

It's a mismatched IP address ranges for IKEv2 (called Traffic Selectors - TS).
The libreswan side and the other endpoint do not agree on the left/right subnets

### Al hacer ping veo el tráfico en ambos sentidos pero no funciona

Era por culpa de tener una interfaz `vti` sin configurar.
No se cuando se creó, tal vez al usar libreswan.

Conseguí que todo funcionase deshabilitándola:

```
ip link set ip_vti0 down
```

## Debug

Para ver un "dump" del estado actual, configuraciones, etc:

```
ipsec status
```

Para sacar trazas, configurar debug a "base".

Por mi experiencia buscando errores, activar el modo debug lo que conseguía era ocultar las trazas útiles. Parece mejor no activar el debug.

Ejemplo de línea que nos dice como se establece la conexión:

```
10.0.0.0/24===10.0.0.5[40.113.59.156]...20.240.192.55===10.240.10.160/27
```

Es la red interna a conectar===a través de una ip privada [ip pública]...ip pública del otro lado===red a conectar del otro lado

# Strongswan

Parece que tiene dos units, strongswan (para usar swanctl) y strongswan-starter (para usar el fichero /etc/strongswan/ipsec.conf)

Parece que los mensajes de error que da strongswan son más útiles que libreswan.

Si usamos strongswan-starter luego podemos comprobar el estado con:

```
redhat:
strongswan status

ubuntu:
ipsec status
```

Ejemplo de salida de una conexión establecida:

```
# strongswan status
Security Associations (1 up, 0 connecting):
 azureTunnel[1]: ESTABLISHED 39 seconds ago, 10.0.0.5[40.113.59.156]...4.223.79.15[4.223.79.15]
 azureTunnel{1}:  INSTALLED, TUNNEL, reqid 1, ESP in UDP SPIs: ce32722a_i 75a3f0e4_o
 azureTunnel{1}:   10.0.0.0/24 === 192.168.3.0/24
```

Con este software si que vemos las rutas en "ip route":

```
# ip route show table 220
192.168.3.0/24 via 10.0.0.1 dev eth0 proto static src 10.0.0.5
```

## Configuración

<https://docs.strongswan.org/docs/5.9/index.html>

La configuración via ipsec.conf está deprecated. (<https://docs.strongswan.org/docs/5.9/config/config.html>)

La configuración ipsec se almacenaba en /etc/ipsec.conf y /etc/ipsec.secrets

### IP forward y NAT

Para que las máquinas del otro lado de la VPN puedan enrutar a la red local donde esté strongswan, necesitamos habilitar el ip forward y el NATeo:

```
sysctl -w net.ipv4.ip_forward=1
modprobe iptable_nat
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### Azure VPN Gateway

Configuración que me ha funcionado:

Con una configuración parametrizada de esta manera, en la connection de azure:

IKE Phase 1

- Encryption: AES256
- Integrity/PRF: SHA256
- DH Group: DHGroup14

IKE Phase 2(IPsec)

- IPsec Encryption: AES256
- IPsec Integrity: SHA256
- PFS Group: PFS2048 (equivalente a group14)

Esta configuración me ha funcionado:

```
conn conn2AzureRouteBasedGW
    authby=secret
    auto=start
    dpdaction=restart
    dpddelay=30
    dpdtimeout=120
    ikelifetime=3600s
    ikev2=yes
    keyingtries=3
    pfs=yes
    phase2alg=aes256-sha256

    salifetime=3600s
    type=tunnel

    ike=aes256-sha256-modp2048!

    left=%defaultroute
    leftid=40.113.59.156
    leftsubnet=10.0.0.0/24

    right=20.240.192.55
    rightid=20.240.192.55
    rightsubnet=10.240.10.0/24

```

Para el vpn gateway sku basic, que no permite configuración específica, me ha funcionado con esta configuración.

```
conn azureTunnel
    authby=secret
    auto=start
    dpdaction=restart
    dpddelay=30
    dpdtimeout=120
    ikelifetime=3600s
    ikev2=yes
    keyingtries=3
    pfs=yes
    phase2alg=aes128-sha1

    salifetime=3600s
    type=tunnel


    left=%defaultroute
    leftid=40.113.59.156
    leftsubnet=10.0.0.0/24

    right=4.223.79.15
    rightid=4.223.79.15
    rightsubnet=192.168.3.0/24

    ike=aes256-sha1-modp1024!
    esp=aes256-sha1-modp2048!
```

Si hemos montado el strongswan en una VM de azure, para que otras VMs e la misma red enruten pasando por ese strongswan tendremos que crear una route table (mirar nube/azure/networking.md). No vale con meterla a mano con un "ip route add ...".

## Troubleshooting

### traffic selectors a.b.c.d/24 === c.d.e.f/24 unacceptable

Era porque al copiar una config de libreswan, estaba usando "leftsubnets" (válido en libreswan, pero no en strongswan). Hay que cambiarlo por "leftsubnet" (sin s).
Lo mismo para la right.

### Podemos pingear a la máquina con strongswan pero no al resto de la red

Nos falta poder forwarder el tráfico:

```
sysctl -w net.ipv4.ip_forward=1
```

Y natearlo con iptables:

```
modprobe iptable_nat
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

### Al hacer ping veo el tráfico en ambos sentidos pero no funciona

Era por culpa de tener una interfaz `vti` sin configurar.
No se cuando se creó, tal vez al usar libreswan.

Conseguí que todo funcionase deshabilitándola:

```
ip link set ip_vti0 down
```
