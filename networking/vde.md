http://wiki.virtualsquare.org/wiki/index.php/VDE_Basic_Networking
https://wiki.archlinux.org/index.php/QEMU#Networking_with_VDE2

Antiguo
Mirar para dar privilegios a usuario no root
http://tjworld.net/wiki/Linux/Ubuntu/VirtualMachinesWithVDENetworking

VDE stands for Virtual Distributed Ethernet. It started as an enhancement of uml_switch. It is a toolbox to manage virtual networks.
The idea is to create virtual switches, which are basically sockets, and to "plug" both physical and virtual machines in them. The configuration we show here is quite simple; However, VDE is much more powerful than this, it can plug virtual switches together, run them on different hosts and monitor the traffic in the switches. You are invited to read the documentation of the project.


sudo apt-get install vde2

Arrancar un virtual switch:

vde_switch -s /tmp/switch1
  Puede hacer como usuario no root.
  Proceso foreground
  Si pulsamos de nuevo a enter estaremos en la consola del switch
