https://home-assistant.io/blog/2015/12/13/setup-encryption-using-lets-encrypt/

configuration.yaml
http:
  ssl_certificate: !secret ssl_cert
  ssl_key: !secret ssl_key

secrets.yaml 
ssl_cert: /etc/letsencrypt/live/DOMINIO/fullchain.pem
ssl_key: /etc/letsencrypt/keys/0000_key-certbot.pem

