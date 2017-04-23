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

Los clientes necesitarán:
ca.crt, client1.crt, client1.key (secreto)

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

Por defecto esta configurado para asignar ips del rango 10.8.0.0/24

Tambien crearemos el fichero ta.key
cd /etc/openvpn/keys
openvpn --genkey --secret ta.key

Este fichero tambien se lo pasaremos a los clientes.
