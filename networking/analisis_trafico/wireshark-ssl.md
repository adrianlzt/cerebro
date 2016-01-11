http://wiki.wireshark.org/SSL

Hace falta que la encriptación SSL sea desencriptable por wireshark:

Algunas que funcionan:
AES256-SHA
RC4-MD5

No funcionan:
DHE-RSA-AES256-GCM-SHA384

Generar certificado del servidor:
openssl genrsa -out server.key 1024
openssl req -new -key server.key -x509 -days 3653 -out server.crt
cat server.key server.crt >server.pem
chmod 600 server.key server.pem


Poner a escuchar wireshark en la interfaz "lo" con filtro "tcp.port == 443"

Server:
sudo openssl s_server -www -cipher AES256-SHA -key server.pem -cert server.crt -accept 443

Cliente:
printf 'GET / HTTP/1.0\r\n\r\n' | openssl s_client -ign_eof -connect 127.0.0.1:443


Veremos trafico HTTP, que estará por debajo de una capa SSL.
Si el protocol no pone que es TLS, forzarlo (boton derecho > Decode As.. -> TLS)
Y para meter la key, boton derecho, protocol preferences -> RSA key list
Hay metemos una entrada nueva con la ip address, port, protocol y el fichero con la key
Protocol: sdpy para http2.0
Si metemos algo sin sentido nos dice los que se aceptan.


# Navegadores
https://jimshaver.net/2015/02/11/decrypting-tls-browser-traffic-with-wireshark-the-easy-way/

Básicamente es arrancar el navegador como:
SSLKEYLOGFILE=/tmp/sslkeylog.log firefox

Luego en el wireshark:
Edit -> Preferences -> Protocols -> SSL -> (Pre)-Master-Secret log filename: /tmp/sslkeylog.log

No veo el trafico http2 correctamente (4/11/2015)
Ni el https normal.


# Socat #
Server:
sudo socat -d -d openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem,cafile=server.pem openssl:be.caja-ingenieros.es:443,verify=0

Cliente:
printf 'GET / HTTP/1.0\r\n\r\n' | openssl s_client -ign_eof -connect 127.0.0.1:443 -cipher 'AES256-SHA'


También (forzando cipher cutre en el server):
Server:
sudo socat -d -d openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem,cafile=server.pem,cipher=MD5 openssl:be.caja-ingenieros.es:443,verify=0

Cliente:
printf 'GET / HTTP/1.0\r\n\r\n' | openssl s_client -ign_eof -connect 127.0.0.1:443
