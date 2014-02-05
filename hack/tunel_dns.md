Para las wifis publicas que nos piden un usuario y un password.
Las peticiones dns suelen estar abiertas a cualquier servidor.
Con iodine crearemos un tunel dns hacia una máquina nuestra para poder salir a internet.

http://dabax.net/tunel_dns
http://code.kryo.se/iodine

http://www.hackplayers.com/2013/09/evadir-un-portal-cautivo-mediante-un.html?utm_source=twitterfeed&utm_medium=facebook

Usar servicio público, gratuitos 50MB:

sudo iodine -f -P canhasinternet 166.78.128.18 i.dfw1.dns.canhasinter.net

En otro terminal:

Generamos una clave ssh para este servicio:
ssh-keygen -t rsa
 La guardamos en /tmp/id_rsa
 mv ~/.ssh ~/.ssh.bueno
 mkdir ~/.ssh
 mv /tmp/id_rsa* ~/.ssh

ssh nopass@172.16.0.1
? r  <- para registrarnos
Copiar la clave is_rsa.pub sin el prefijo "ssh-rsa" ni el final con el user y el hostname
Decir que 'y' si la clave se muestra bien.
Y salimos con 'q'

sudo ip route add 8.8.8.8/255.255.255.255 via <puerta-enlace-wifi-cautiva>
sudo ip route add 8.8.4.4/255.255.255.255 via <puerta-enlace-wifi-cautiva>
sudo ip route add 166.78.128.18/255.255.255.255 via <puerta-enlace-wifi-cautiva>
sudo ip route del default
sudo ip route add default via 172.16.0.1




No he conseguido que funcione 1/2/2014
