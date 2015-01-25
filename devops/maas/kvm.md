# KVM en un solo nodo

Para hacer pruebas levantarnos un servidor MAAS con kvm.
Ponerle dos interfaces de red, una bridged y otra para conectar con el host.
La interfaz no macvtap tendremos que configurarla a mano, poniéndola la misma ip que tenga la interfaz virbr0 del host de kvm.
A través de esta interfaz manual será como nos conectemos al servidor maas.

Los clientes los levantamos con kvm.
Tienen que tener una tarjeta de red conectada a la misma red que el nodo maas. Si usamos bridge no funciona.

La interfaz por donde están unidos los dos hosts tiene por defecto un servidor dhcp. Deberemos quitarlo para que funcione el de maas.


Configurar la nueva interfaz en la interfaz gráfica, en la sección clusters.
La siguiente parte es como lo hice a mano, porque no recordaba lo de editar interfaces en la interfaz.

### Manual ###
Deberemos configurar el servidor dhcp del servidor maas para que funcione en esa interfaz, asignando un rango de ips como el de virbr0.
El router deberá ser la ip de virbr0
El domain name server, la ip que hayamos asignado al servidor maas.
Ejemplo para subred 192.168.123.0/24
subnet 192.168.123.0 netmask 255.255.255.0 {
       if option arch = 00:0E {
          filename "pxelinux.0";
          option path-prefix "ppc64el/";
       } elsif option arch = 00:07 {
          filename "bootx64.efi";
       } elsif option arch = 00:0C {
          filename "bootppc64.bin";
       } else {
          filename "pxelinux.0";
       }
       interface "eth0";
       ignore-client-uids true;
       option subnet-mask 255.255.255.0;
       option broadcast-address 192.168.123.255;
       option domain-name-servers 192.168.123.2;
       option domain-name "maas";
       option routers 192.168.123.1;
       option ntp-servers 91.189.94.4;
       range dynamic-bootp 192.168.123.201 192.168.123.224;
       class "PXE" {
          match if substring (option vendor-class-identifier, 0, 3) = "PXE";
          default-lease-time 30;
          max-lease-time 30;
       }
}

Tras el cambio:
restart maas-dhcp-server

### Fin manual ###

Para que el servidor maas siempre tenga su interfaz bien configurada podemos usar el fichero interfaces:
iface eth0 inet static
  address 192.168.123.2
  netmask 255.255.255.0
  gateway 192.168.123.1
