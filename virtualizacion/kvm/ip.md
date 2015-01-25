Si tenemos un servidor dhcp, podemos preguntar al servidor con el nombre del dominio.


Si es libvirt el que está haciendo de servidor dhcp:
/var/lib/libvirt/dnsmasq/detaul.leases


Aqui hacen un script preguntando a la base de datos arp, pero no me ha funcionado.
Tal vez porque tengo la máquina como bridge
https://rwmj.wordpress.com/2010/10/26/tip-find-the-ip-address-of-a-virtual-machine/

Lo mismo en un script en bash muy simple
https://gist.github.com/mistofvongola/4447791


Tambien podemos hacer ping a todas las ips del segmento y luego mirar la cache arp
ping -b 192.168.1.255
ip n

Si no funciona con el broadcast:
for i in {1..249}
 do
  ping -c 1 -n -q -r  -t 1 -s 1  -W 1   192.168.100.$i > /dev/null &
done


Leer un fichero de la VM
sudo virt-cat NOMBRE /var/lib/dhcp/dhclient.eth0.leases
  es muy bestia, tiene que montar la maquina. Tarda mucho.



git clone https://github.com/larsks/virt-utils 
cd virt-utils 
sudo make install 
virt-hosts
No me funciona
