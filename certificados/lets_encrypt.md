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
