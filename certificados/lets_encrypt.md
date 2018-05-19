Cliente web para generar el cert.
https://gethttpsforfree.com/
Nos pedirá que arranquemos un server web en el puerto 80 del dominio que queremos registrar, o servir un fichero.

# Lets encrypt
Entidad gratuita: https://letsencrypt.org/
Let’s Encrypt is a new Certificate Authority: It’s free, automated, and open.

Lo aceptan todos los navegadores.

# Certbot
https://certbot.eff.org/docs/using.html

yum install certbot

wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
./certbot-auto certonly --standalone --preferred-challenges http-01 --email your@email.address -d hass-example.duckdns.org
Usando el puerto 80 (http-01)


## Renew

Poniendo ficheros en el www root:
/usr/bin/certbot renew --webroot-path /var/www/html/



# Docker
http://letsencrypt.readthedocs.io/en/latest/install.html?highlight=docker#running-with-docker

mkdir -p /var/tmp/letsencrypt/{etc,var}
docker run -it --rm -p 443:443 --name certbot -v "/var/tmp/letsencrypt/etc:/etc/letsencrypt" -v "/var/tmp/letsencrypt/var:/var/lib/letsencrypt" certbot/certbot certonly
Usar la opcion 1 (Spin up a temporary webserver (standalone))


# Manual
https://certbot.eff.org/docs/using.html#manual

mkdir letsencrypt
docker run -it --rm -v "$PWD/letsencrypt:/etc/letsencrypt" quay.io/letsencrypt/letsencrypt:latest certonly --manual

Nos dara instrucciones de como levantar un server http con python en el puerto 80 para poner el fichero que nos piden.


Otra opcion, poniendo ficheros en webroot:
docker run -it --rm -v "$PWD/letsencrypt:/etc/letsencrypt" quay.io/letsencrypt/letsencrypt:latest certonly --webroot



# Multidomain
certbot certonly --manual -d one.example.com,two.example.com,three.example.com
usa puerto 80
nos pedirá que coloquemos un fichero en dominio/.wll-known/acme-challenge/XXX


# Limits
https://letsencrypt.org/docs/rate-limits/
