https://openvpn.net/

# Docker
https://hub.docker.com/r/kylemanna/openvpn/

Generar una VPN que no nos mete default route (-d), ni DNS (-D) y natea (-N) para poder acceder a la red 10.10.166.0/24
mkdir -p data
docker run -v $PWD/data:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u udp://vpn.MI.DOMINIO -p "route 10.16.166.0 255.255.255.0" -D -d -N
docker run -e EASYRSA_BATCH=1 -v $PWD/data:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki nopass
USER=adrian
docker run -v $PWD/data:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full $USER nopass
docker run -v $PWD/data:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient ${USER} > ${USER}.ovpn
docker run --name openvpn -v $PWD/data:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn

Crea un usuario adrian.ovpn
Para conectar:
sudo openvpn --config adrian.ovpn


ANTIGUO:
init:
$OVPN_DATA=openvpn_data
docker volume create --name $OVPN_DATA
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u udp://VPN.SERVERNAME.COM
  aqui podemos pasar mas configuraciones, pero me he encontrado con fallos al hacerlo.
  Mejor editar el fichero una vez generado: vi /var/lib/docker/volumes/openvpn_data/_data/openvpn.conf
  Para enviar rutas (probando una vpn creo que pushear rutas hacia que no funcionase, pero no lo se seguro):
    push "route 10.0.1.0 255.255.255.0"
  Para enviar config DNS:
    #push "block-outside-dns"
    #push "dhcp-option DNS 8.8.8.8"

  Iptables:
    veo que al menos mete esta ruta, en la tabla nat:
    -A POSTROUTING -s 172.17.0.8/32 -d 172.17.0.8/32 -p udp -m udp --dport 1194 -j MASQUERADE


docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki
  nos pedira meter una password para proteger la clave, al final nos la vuelve a pedir dos veces

docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn

Generar cert para cliente:
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass
  nos pedira la pass que pusimos el principio

docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > CLIENTNAME.ovpn
  obtener config para un cliente ya creado
  Si queremos podemos meter rutas en el fichero del cliente, añadimos al fichero ovpn:
    route-up routes.sh
    script-security 2
  Y en el fichero routes.sh
    #!/bin/sh
    ip route add 10.0.1.0/24 dev ${dev}
    ip route add 10.0.2.0/24 dev ${dev}

Cuando el cliente conecte con systemd, en el Status deberá aparecer: "Initialization Sequence Completed"


Listar clientes:
docker run --rm -it -v $OVPN_DATA:/etc/openvpn kylemanna/openvpn ovpn_listclients

Revocar cliente:
docker run --rm -it -v $OVPN_DATA:/etc/openvpn kylemanna/openvpn ovpn_revokeclient client1 remove




ANTIGUO
Simplificandolo
En el host necesitaremos:
modprobe tun
/etc/sysctl.d/01-openvpn.conf
net.ipv4.ip_forward = 1
sysctl net.ipv4.ip_forward=1
docker run -d -v "/root/openvpn:/etc/openvpn" --net=host --privileged --name openvpn kylemanna/openvpn /usr/sbin/openvpn --writepid /tmp/server.pid --cd /etc/openvpn --config openvpn.conf --script-security 2

Generar cert para cliente:
docker run -v /root/openvpn:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass



# Cliente
sudo openvpn --config fichero.ovpn

Si queremos meter auth automática.
En el fichero .ovpn:
auth-user-pass auth.txt

Y en el auth.txt:
user
password

Si queremos poner nuestras propias rutas: https://askubuntu.com/questions/612840/adding-route-on-client-using-openvpn
route-noexec  # no aceptamos las que nos da el server
script-security 2  # permitimos la ejecuccución de scripts de usuario
route-up routes.sh  # script donde ejecutamos los comandos para poner nuestras rutas

Si usamos openvpn con systemd tiene bastante restringido que puede hacer (limitadas capabilities, donde puede escribir, etc).
Tenedremos que poner el script en el mismo directorio donde este la conf de cliente. Si queremos generar algún log tendrá que ser también en ese mismo dir.

Al script se le pasan una serie de variables de entorno con los datos de la conex y las rutas que quiere meter el servidor.
Mirar "Environmental Variables" en https://openvpn.net/index.php/open-source/documentation/manuals/65-openvpn-20x-manpage.html
Una muy util para definir rutas es ${dev} que tendrá el valor "tun0", "tun1" o el que corresponda.



# Server
https://openvpn.net/index.php/open-source/documentation/howto.html

yum install openvpn

Hay que elegir entre usar routing o bridgin (https://openvpn.net/index.php/open-source/faq.html#bridge1 https://openvpn.net/index.php/open-source/documentation/miscellaneous/76-ethernet-bridging.html).
Overall, routing is probably a better choice for most people, as it is more efficient and easier to set up (as far as the OpenVPN configuration itself) than bridging. Routing also provides a greater ability to selectively control access rights on a client-specific basis.

Por defecto elegiremos routing.


## Certificados
Generaremos una CA que generará los certificados del servidor y los clientes

yum install -y easy-rsa

cd /usr/share/easy-rsa/2.0
editamos el fichero vars (modificamos KEY_COUNTRY KEY_PROVINCE KEY_CITY KEY_ORG KEY_EMAIL KEY_OU)
source vars
./clean-all
./build-ca
En keys/ tendremos el certificado y clave de la ca

Creamos un cert para un servidor
./build-key-server nombremaquina

Ahora un certificado para cliente:
./build-key adrian

Necesitamos tambien generar los paramestros Diffie Hellman:
./build-dh

El servidor normalmente neceistará los ficheros:
ca.crt, ca.key (secreto), dh*.pem NOMBRESERVER.crt NOMBRESERVER.key (secreto)

Tambien meteremos una linea tipo por cada red interna a la que queremos acceder
push "route 10.0.1.0 255.255.255.0"
Esta linea publica esa ruta a los clientes vpn. Asi estos tendran que para acceder a 10.0.1.0/24 vayan por la vpn.

Para que esto funcione el servidor del tunel tiene que tener activado el ip forwarding:
sysctl net.ipv4.ip_forward=1

Mirar tambien que iptables no esta haciendo nada raro.
Por ejemplo, al instalar docker me pone la regla filter.FORWARD a DROP. Para quitarlo:
iptables -t filter -P FORWARD ACCEPT

Las maquinas a las que conectemos tendran que tener una ruta para contestar a las maquinas de la vpn.
Algo tipo (siendo la .28 el server vpn):
ip r add 10.8.0.0/24 via 10.0.1.28

O meter la ruta en el router que usen estas máquinas.


Los clientes necesitarán:
ca.crt, client1.crt, client1.key (secreto) y ta.key

Copiamos todo al dir de openvpn
cp -r /usr/share/easy-rsa/2.0/keys/ /etc/openvpn/


## Configuración
Cogeremos como base alguno de los ficheros de ejemplo de
/usr/share/doc/openvpn-2.4.1/sample/sample-config-files
server.conf
client.conf

cp server.conf /etc/openvpn/
vi /etc/openvpn/server.conf

modificaremos los parametros:
ca, cert, key and dh

Tambien descomentaremos "user nobody" y "group nobody"

Podemos meter en la config DHCP servidores DNS (puede tener implicaciones https://community.openvpn.net/openvpn/wiki/279-are-there-any-issues-related-to-pushing-dhcp-options-to-windows-clients):
push "dhcp-option DNS 10.0.1.1"
Con nslookup me resuelve bien, pero ping ni chrome resuelven.

Por defecto esta configurado para asignar ips del rango 10.8.0.0/24

Tambien crearemos el fichero ta.key
cd /etc/openvpn/keys
openvpn --genkey --secret ta.key

Este fichero tambien se lo pasaremos a los clientes.


En el cliente configuaremos el fichero client.conf de manera similar, definiendo tambien el server (remote).

Luego arrancaremos el servidor (tendremos que llegar al puerto 1194/UDP)
Y posteriormente el cliente.

En el cliente, copiaremos todos los ficheros (config, certs y keys) a /etc/openvpn/client
Para arrancarlo haremos
sudo systemctl start openvpn-client@NOMBREFICHEROCONFIG


# Management
https://openvpn.net/management.html

telnet localhost 7505


## h2. Generate cert for a new user
source /etc/openvpn/vars
cd /usr/share/easy-rsa/2.0
./build-key personName
(hit enter couple of times, modifying the email. Sign the cert "y", commit "y")

Created files:
/usr/share/easy-rsa/2.0/keys/personName.{key,csr,crt}
/usr/share/easy-rsa/2.0/keys/nn.pem

Updated:
/usr/share/easy-rsa/2.0/keys/{serial,index.txt.attr,index.txt}

We copy all to the openvpn keys dir:
<pre>
/bin/cp -fa /usr/share/easy-rsa/2.0/keys/* /etc/openvpn/keys/
</pre>

Files needed by users to connect to the VPN:
<pre>
personName.{key,csr,crt}
config.ovpn
/etc/openvpn/keys/ca.crt
/etc/openvpn/keys/ta.key

cd /etc/openvpn/keys
tar zcvf personName.tgz personName* ca.crt ta.key
</pre>

The config file is attached to this wiki.


## Using in windows

Download and install: https://openvpn.net/index.php/open-source/downloads.html

Copy the files given to folder c:\Users\USER\OpenVPN\config\somename

Click the OpenVPN taskbar icon, right click, Connect.


## Using in OSX
https://openvpn.net/index.php/access-server/docs/admin-guides/183-how-to-connect-to-access-server-from-a-mac.html
Dicen de usar https://tunnelblick.net/

Como configurar los DNS. Parece que hace falta poner un programa extra.
https://unix.stackexchange.com/questions/201946/how-to-define-dns-server-in-openvpn
