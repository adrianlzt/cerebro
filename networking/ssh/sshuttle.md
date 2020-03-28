https://man.openbsd.org/ssh.1#SSH-BASED_VIRTUAL_PRIVATE_NETWORKS
On the client:
# ssh -f -w 0:1 192.168.1.15 true
# ifconfig tun0 10.1.1.1 10.1.1.2 netmask 255.255.255.252
# route add 10.0.99.0/24 10.1.1.2
On the server:
# ifconfig tun1 10.1.1.2 10.1.1.1 netmask 255.255.255.252
# route add 10.0.50.0/24 10.1.1.1


https://github.com/apenwarr/sshuttle
http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html

Using Sshuttle to Forward Connections

Montar una VPN a través de una conexión ssh.

sshuttle necesita poder hacer sudo sin passwd, por lo que ejecutaremos un comando con sudo que permitirá durante unos minutos que se pueda usar sudo sin password.
Iremos a nuestro HOME porque necesita crear el fichero sshuttle.pid
sudo pwd
cd
sshuttle -r maquina-salto 192.168.42.0/24
  -D dameon mode (dificil de matar)
  -H poner los hosts de la maquina-salto accesible localmente


Nos conectará a la red 192.168.42.0/24 a través de el host 'maquina-salto'.
De esta manera podremos, por ejemplo, acceder al puerto 3306 de una máquina 192.168.42.x a la que no tenemos conexión directamente.


Matar con
kill $(cat sshuttle.pid)


Hace uso de iptables (tabla NAT)
adrian:~$ sudo iptables-save | grep sshu
:sshuttle-12300 - [0:0]
-A PREROUTING -j sshuttle-12300
-A OUTPUT -j sshuttle-12300
-A sshuttle-12300 -d 192.168.42.0/24 -p tcp -m ttl ! --ttl-eq 42 -j REDIRECT --to-ports 12300
-A sshuttle-12300 -d 127.0.0.0/8 -p tcp -j RETURN

Abre un puerto en localhost y nos redirige el tráfico de la red que hayamos configurado a ese puerto.
La primera y segunda regla dice que todo el tráfico de PREROUTING y OUTPUT debe pasar por la Chain "sshuttle-12300"
Esta Chain dice que si queremos enviar un paquete a 192.168.42.0/24 lo redirijamos al puerto 12300
La última regla es para que el tráfico localhost no se toque (creo).
