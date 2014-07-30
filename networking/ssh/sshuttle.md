https://github.com/apenwarr/sshuttle
http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html

Using Sshuttle to Forward Connections

Montar una VPN a través de una conexión ssh.

sshuttle necesita poder hacer sudo sin passwd, por lo que ejecutaremos un comando con sudo que permitirá durante unos minutos que se pueda usar sudo sin password.
Iremos a nuestro HOME porque necesita crear el fichero sshuttle.pid
sudo pwd
cd
sshuttle -DHr maquina-salto 192.168.42.0/24
  -D dameon mode (dificil de matar)
  -H poner los hosts de la maquina-salto accesible localmente


Nos conectará a la red 192.168.42.0/24 a través de el host 'maquina-salto'.
De esta manera podremos, por ejemplo, acceder al puerto 3306 de una máquina 192.168.42.x a la que no tenemos conexión directamente.


Matar con
kill $(cat sshuttle.pid)
