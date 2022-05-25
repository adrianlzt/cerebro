https://www.gns3.com/

Virtualizador de elementos de red.

Cosas que podemos simular: https://gns3.com/marketplace/appliances

# API
Python: https://github.com/davidban77/gns3fy
Ansible: https://galaxy.ansible.com/davidban77/gns3

# Install
En arch, con AUR:
yay gns3-server gns3-gui

En ubuntu:
sudo add-apt-repository ppa:gns3/ppa
sudo apt update
sudo apt install gns3-gui gns3-server

Para switches cisco necesitaremos KVM



# Arrancar server
sc-start gns3-server@adrian
Levanta el server en 127.0.0.1:3080

Se creará un user y password random, podemos verlos en:
/home/adrian/.config/GNS3/2.2/gns3_server.conf

## Proyectos
Los ficheros de los proyectos se guardan en:
/home/adrian/GNS3/projects/d75048c5-27e5-4d26-95fb-fbadfab669bc/three_router_simple.gns3

Si usamos dynamips para virtualizar routers, en project-files/dynamips podemos ver el log del router.




# GUI
Arrancar la gui:
gns3
Por defecto intentará conectar a 127.0.0.1:3080


## Capturar tráfico
Si pinchamos con el botón derecho sobre algún link podemos capturar tráfico.
Abrirá el wireshark.


# Routers
Tenemos que bajar las imágenes de los routers que queramos ejecutar.

Las templates preconfigurada las encontramos en
/usr/lib/python3.9/site-packages/gns3server/appliances/



## Configuración
Entrar por telnet a los routers.
Podemos ver sus puertos en la ventana "Topology summary"




### Añadir interfaces
Editar el router (right click), ir a Slots y añadir una del tipo que necesitemos.
Dependerá de cada router.
PA-FE-TX (FastEthernet)
PA-2FE-TX (FastEthernet, 2 ports)
PA-4E (Ethernet, 4 ports)
PA-8E (Ethernet, 8 ports)
PA-4T+ (Serial, 4 ports)
PA-8T (Serial, 8 ports)
PA-A1 (ATM)
PA-POS-OC3 (POS)
PA-GE (GigabitEthernet)



## Cisco
Las imágenes son de pago.
Donde poder bajarlas:
http://tfr.org/cisco-ios/
https://www.reddit.com/r/opendirectories/comments/7rmbi3/lots_of_cisco_ios_firmware_images_for_gns3_etc/
https://gist.github.com/takyon12/ec938f7dbd4d32d2ba3e

Por ejemplo para correr el router cisco 7200 usaremos la imagen
http://tfr.org/cisco-ios/7200/c7200-adventerprisek9-mz.124-24.T5.bin

También necesitaremos tener instalado dynamips

Switches:
https://gns3.com/marketplace/appliances/cisco-iosvl2
Necesita KVM


# VPCS
https://github.com/GNS3/vpcs
Simple Virtual PC Simulator

Simuladores de PC, con una config similar a los routers.

Configurar ip a mano
ip 192.168.0.2/24 192.168.0.1

Para persistir la configuración:
save

Si queremos ver la conf ip y la MAC
show

Parece que las MAC empiezan con:
00:50:79:66:68:



# Errores
## md5 checksum error al intentar usar una imagen
Cambiar el md5sum en el fichero .gns3a
Ejemplo:
/usr/lib/python3.9/site-packages/gns3server/appliances/cisco-7200.gns3a

Tuve que reiniciar el server y la gui.


## Version distinta del server y GUI
Variaban en el minor (a.b.31 vs a.b.32) y no fucionaba.
Cambiando a mano el version.py del server parece que evita ese chequeo y la gui comunica correctamente.


## C7200 'Ghost': generic_nvram_extract_config: Unknown error
### Poner la misma zona horaria en el gns server y gui
ln -fs /usr/share/zoneinfo/Europe/Madrid /etc/localtime
Parece que funciona

### Usar la versión dynamips de x86

En ubuntu:
dpkg --add-architecture i386
apt update
apt install dynamips:i386
No me ha funcionado


## El GUI no abre la consola a los routers
Mirando el stdout del gui:
xterm: cannot load font "-*-lucidatypewriter-medium-*-*-sans-12-*-iso10646-1"

General preferences - console
alacritty --hold -t "%d" -e telnet %h %p

Si estamos conectados a un server remoto, nos pondrá la ip de localhost, por lo que no podremos conectar.
Tal vez podemos modificar el comando para hacer ssh primer al server y luego telnet.
O conectar desde la terminal del server remoto.

Si al conectar por ssh nos sale "200-At least a module and a command must be specified" es que estamos conectando al propio dynamips, no al router.
Podemos ver los puertos de los routers en la GUI, a la derecha.




# Dynamips
Simulador de routers cisco
Para levantar una imagen
dynamics fichero.image

Al terminar nos dejará en la consola del router

## Opciones de dynamips dentro de la consola del router
Control+AltGr+]
q: quit
c: write config to ios_cfg.txt


# Guests
Por defecto podemos crear una especie de PCs simplificados a los que podemos configurar una ip, hacer ping, ver su tabla de arp, etc.
Pero son muy básicos.

Podemos también conectar otros sitemas (linux/windows/dockers).

Por ejemplo podemos conectar una Debian10 que se levantará con QEMU.
https://docs-v1.gns3.com/appliances/debian10-min.html
Username: root
Password: debian
No me funciona la terminarl por telnet, solo por VNC
Una vez conectada a una VM externa, si queremos acceder por ssh tendremos que cambiar la config de sshd y poner y reiniciar el demonio:
PermitRootLogin yes


También podemos conectar contendores docker.



# Conectar GNS3 a una red externa
https://www.b-ehlers.de/blog/posts/2017-07-11-gns3-cloud-linux/
https://docs.gns3.com/docs/using-gns3/advanced/connect-gns3-internet/


## conex ethernet directa
Con GNS3 montado sobre una VM de OST no consigo que el qemu coja IP.
Mirando el tráfico entre la "cloud" y la linux-qemu, veo el arp request y response.
Pero en el host de GNS3 no llega el arp-response.

Los paquetes DHCP del qemu se ven correctamente en el cable con la cloud.
Pero si arranco tcpdump en el host-gns3, tcpdump no lo sabe interpretar. Y de hecho si arrancao tcpdump sin "-i any", no veo ese tráfico.

Diría que inyecta el tráfico de alguna manera rara que OST no soporta.
Tal vez tenga que ver con esto:
https://gns3.com/community/featured/failed-to-acquire-external-dhcp-
https://gns3.com/community/featured/gns3-running-on-openstack-unable


## brige
Si consigo conectar la qemu al host usando la interfaz virbr0.
La linux-qemu coje correctamente dhcp

Ahora tenemos que permitir el enrutado del tráfico y NATting por el host de gns3.
ens3 es la interfaz pública del host gns3.
virbr0 es donde tenemos conectada la linux-qemu

sysctl -w net.ipv4.ip_forward=1
vi /etc/sysctl.conf
  meterlo para hacerlo permanente

iptables -t nat -A POSTROUTING -o ens3 -j MASQUERADE
iptables -A FORWARD -i ens3 -o virbr0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i virbr0 -o ens3 -j ACCEPT

