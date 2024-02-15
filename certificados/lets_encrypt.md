# Web
Cliente web para generar el cert.
https://gethttpsforfree.com/
Nos pedirá que arranquemos un server web en el puerto 80 del dominio que queremos registrar, o servir un fichero.

# Lets encrypt
Entidad gratuita: https://letsencrypt.org/
Let’s Encrypt is a new Certificate Authority: It’s free, automated, and open.
Lo aceptan todos los navegadores.

# Buypass
Otra alternativa a letsencrypt, que soporta el protocolo ACME.
Da certs a 180 días.
No wildcard, pocos subdominios por cert.
Menos rate de certificados/semana.

Con certbot:
https://www.buypass.no/produkter/tls-ssl-sertifikater/ressurser-tls-ssl-sertifikater/produkter/buypass-go-ssl-technical-information

# Otras opciones
https://certbot.eff.org/hosting_providers
Let's Encrypt
Buypass Go SSL
ZeroSSL (Requires EAB Credentials)
Google Trust Services (Requires EAB Credentials)
SSL.com (Requires EAB Credentials)

# EAB / ACME external account binding
The ACME protocol (RFC 8555) defines an external account binding (EAB) field that ACME clients can use to access a specific account on the certificate authority (CA).


# Certbot
https://certbot.eff.org/docs/using.html
Utilidad para obtener un cert de Let’s Encrypt usando el protocolo ACMEv2 (https://tools.ietf.org/html/rfc8555)

## Snap
snap install --classic certbot
Mete un timer de systemd en vez de un cron

systemctl list-timers snap.certbot.renew.timer


## yum
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


### Delegar DNS a otra zona
https://community.letsencrypt.org/t/trusted-ssl-for-private-networks/149663/4
https://docs.certbot-dns-azure.co.uk/en/latest/#dns-delegation
  buena explicación

Since Let’s Encrypt follows the DNS standards when looking up TXT records for DNS-01 validation, you can use CNAME records or NS records to delegate answering the challenge to other DNS zones.

Podemos delegar con un CNAME para que la verificación del domino foo.com no se haga en _acme-challenge.foo.com si no en otra zona.

_acme-challenge.sub.domain.com CNAME somethingelse




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


# Certificados solicitados
https://crt.sh/
En esa web podemos ver que certificados se han solicitado para determinados dominios.
