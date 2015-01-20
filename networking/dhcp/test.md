apt-get install dhcping
dhcping -v -s 192.168.1.1
  comprueba si hay un server dhcp en esa ip

A veces no me ha funcionado. Me dice que no hay contestación pero está funcionando correctamente.
Probar con -i
Veo la traza en dnsmasq pero sigue diciendo no answer


Otra opción:
Crear un alias a la interfaz y hacer un dhclient dry-run:
ip link add dev macvlan0 link eth0 type macvlan
sudo dhclient -w -n macvlan0
 (en ubuntu he visto que la pagina man me dice que tengo los parametros -n y -w, pero luego el --help me dice que no existen y nos los puedo usar)
o
sudo dhcpcd -T macvlan0

O podemos configurarla con dhcp y luego borrarla:
sudo dhclient macvlan0

Borrarla:
ip link delete dev macvlan0

