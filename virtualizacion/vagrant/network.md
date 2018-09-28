http://docs.vagrantup.com/v2/networking/index.html

# Bridged network
Descomentar la siguiente linea en el Vagrantfile:
config.vm.network :public_network

Al arrancar nos preguntará a que interfaz nos tenemos que "bridgear".
Podemos definir la interfaz por defecto con:
  config.vm.network :public_network, :bridge => 'en2: USB Ethernet'

Para tener una lista de preferidas mirar en http://stackoverflow.com/questions/17729757/preferred-fallback-network-interfaces-with-vagrant


# Private network
config.vm.network :private_network, ip: "192.168.50.4"

Redireccionar puertos:
config.vm.network :forwarded_port, guest: 80, host: 8080
  Con el parámetro :host_ip se puede apuntar a una ip determinada






Vagrant 1.4.0
VirtualBox internal networks are now supported


Para LXC:
config.vm.provider :lxc do |lxc|
  lxc.customize 'network.ipv4', '10.0.3.100/32'
end

No podemos usar esta forma de configurar la red en LXC si definimos el hostname.
En este caso podemos hacero provisionando con shell:
config.vm.provision "shell", inline: "/sbin/ip addr add 10.0.3.100/32 dev eth0"
  No resiste reinicios. Ver donde poner para que si los resista.

Añadir un alias permanente, para Ubuntu:
echo <<END
auto eth0:0
iface eth0:0 inet static
name Ethernet alias LAN card
address 192.168.200.2
netmask 255.255.255.0
broadcast 192.168.200.255
network 192.168.200.0
END >> /etc/network/interfaces



Los nodos están conectados entre sí, por lo que con que definamos la misma red para los nodos ellos se podrán comunicar (máscara 255.255.255.0)
10.0.0.0 - 10.255.255.255
172.16.0.0 - 172.31.255.255
192.168.0.0 - 192.168.255.255	


Redireccionar puertos en una maquina corriendo:
http://stackoverflow.com/questions/7565446/change-vagrant-port-forwarding-on-a-running-system
