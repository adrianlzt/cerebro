http://www.dest-unreach.org/socat/doc/socat-openssl.txt

Mirar wireshark-ssl.md

Generar certificado del servidor:
openssl genrsa -out server.key 1024
openssl req -new -key server.key -x509 -days 3653 -out server.crt
cat server.key server.crt >server.pem
chmod 600 server.key server.pem

sudo socat openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem openssl:sro.whatsapp.net:443,verify=0
sudo socat -d -d openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem,cafile=server.pem,cipher=MD5 openssl:be.caja-ingenieros.es:443,verify=0

Abre el puerto 443 en mi máquina, y redirige las peticiones al servidor be.caja-ingenieros.es

Conectar con:
curl -k -H 'Host: be.caja-ingenieros.es' https://localhost/
