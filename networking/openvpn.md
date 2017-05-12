https://openvpn.net/

# Cliente
sudo openvpn --config fichero.ovpn

Si queremos meter auth automática.
En el fichero .ovpn:
auth-user-pass auth.txt

Y en el auth.txt:
user
password



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
