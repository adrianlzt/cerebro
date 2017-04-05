Cliente web para generar el cert.
https://gethttpsforfree.com/

# Lets encrypt
Entidad gratuita: https://letsencrypt.org/
Let’s Encrypt is a new Certificate Authority: It’s free, automated, and open.

Lo aceptan todos los navegadores.

# Install
pacman -S dialog
pip install letsencrypt

# Uso
sudo letsencrypt run
  configura automaticamente apache y nginx

sudo letsencrypt -d example.com auth
  pone el certificado del dominio "example.com" en

Esto levantará un demonio en el puerto 443
Hablará con el servicio de LetsEncrypt para que conecte con el dominio que queremos registrar.
LetsEncrypt enviará una petición a ese dominio, que deberá contestar el demonio que hemos levantado.
Nos generará los ficheros para poder configurar el certificado ssl.


# Certbot (otro cliente)
https://certbot.eff.org/docs/using.html

wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
./certbot-auto certonly --standalone --preferred-challenges http-01 --email your@email.address -d hass-example.duckdns.org
Usando el puerto 80 (http-01)



# Docker
http://letsencrypt.readthedocs.io/en/latest/install.html?highlight=docker#running-with-docker

mkdir -p /var/tmp/letsencrypt/{etc,var}
docker run -it --rm -p 443:443 --name certbot -v "/var/tmp/letsencrypt/etc:/etc/letsencrypt" -v "/var/tmp/letsencrypt/var:/var/lib/letsencrypt" quay.io/letsencrypt/letsencrypt:latest certonly
Usar la opcion 2


# Manual
https://certbot.eff.org/docs/using.html#manual

mkdir letsencrypt
docker run -it --rm -v "$PWD/letsencrypt:/etc/letsencrypt" quay.io/letsencrypt/letsencrypt:latest certonly --manual

Nos dara instrucciones de como levantar un server http con python en el puerto 80 para poner el fichero que nos piden.


Otra opcion, poniendo ficheros en webroot:
docker run -it --rm -v "$PWD/letsencrypt:/etc/letsencrypt" quay.io/letsencrypt/letsencrypt:latest certonly --webroot
