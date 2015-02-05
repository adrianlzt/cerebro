https://maas.ubuntu.com/docs1.5/nodes.html

Pasos:
  1.- Nodo arranca con netboot
  2.- Contacta con el server DHCP
  3.- Carga imagen PXE
  4.- Contacta servidor MAAS, mediante un cloud-init que lleva insertado (envía MAC, arquitectura, etc)
    4.1.- Antes de correr cloud-init se le envía información con preseeds: preseeds.md
    4.2.- Una vez arrancado cloud-init obtiene la información necesaria de la metadata api: https://maas.ubuntu.com/docs/development/metadata.html
  5.- Se registra contra MAAS
  6.- Se apaga
  7.- El nodo aparece en MAAS como "Declared"
  8.- Podemos verlo en la interfaz web y definir su "Power type" en caso de que no lo haya cogido automáticamente

Seguir en accept_and_commission.md


Deberemos aceptar manualmente los nodos, o poner aceptación automática:
maas <profile> nodes accept-all

Podemos añadir nodos manualmente desde la interfaz web o la cli
maas adrian nodes new architecture=amd64/generic mac_addresses=aa:bb:cc:dd:ee:ff hostname=pepe power_type=virsh
La cli ya nos muestra que opciones podemos seleccionar, así que es preferible.

https://maas.ubuntu.com/docs1.5/nodes.html#virtual-machine-nodes
Para poder levantar máquinas virtuales usaremos:
power_type=virsh
Y tendremos que tener instalado:
apt-get install libvirt-bin

Crear clave ssh para poder usar virsh+ssh
mkdir /home/maas
chown maas:maas /home/maas
chsh -s /bin/bash maas
su - maas
ssh-keygen
ssh-copy-id login@server
ssh login@server
  testear si puedo conectar

virsh -c qemu+ssh://adrian@192.168.200.1/system



Si instalamos una imagen ubuntu, el usuario será 'ubuntu'
