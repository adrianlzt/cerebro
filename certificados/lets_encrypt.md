# Web
Cliente web para generar el cert.
https://gethttpsforfree.com/
Nos pedirá que arranquemos un server web en el puerto 80 del dominio que queremos registrar, o servir un fichero.

# Lets encrypt
Entidad gratuita: https://letsencrypt.org/
Let’s Encrypt is a new Certificate Authority: It’s free, automated, and open.

Lo aceptan todos los navegadores.

# Certbot
https://certbot.eff.org/docs/using.html
Utilidad para obtener un cert de Let’s Encrypt usando el protocolo ACMEv2 (https://tools.ietf.org/html/rfc8555)

yum install certbot
certbot certonly --webroot-path /var/www/html/ --email email@mail.com -d domain.com --preferred-challenges http -n --webroot
Usando el puerto 80 (http) y usando webroot


## Renew

  Poniendo ficheros en el www root:
  /usr/bin/certbot renew --webroot-path /var/www/html/


## DNS-01
Para que verifiquen que el dominio es nuestro, crearemos una entrada TXT
certbot -d dominio.com --manual --preferred-challenges dns --config-dir . --work-dir . --logs-dir . certonly

Nos dará una clave que tendremos que meter en un registro TXT para el dominio:
_acme-challenge.dominio.com

DNS+Docker
mkdir etc var
docker run -it --rm --name certbot -v "$PWD/etc:/etc/letsencrypt" -v "$PWD/var:/var/lib/letsencrypt" certbot/certbot --no-eff-email --agree-tos -m MIEMAIL@DOMINIO.COM --manual-public-ip-logging-ok -d MI.DOMINIO.COM --manual --preferred-challenges dns certonly



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
