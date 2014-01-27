socat openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem openssl:sro.whatsapp.net:443,verify=0

Abre el puerto 443 en mi máquina, y redirige las peticiones al servidor sro.whatsapp.net
