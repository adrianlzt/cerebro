http://web.archive.org/web/20070629165848/http://www.heise-security.co.uk/articles/82481
https://www.cyberciti.biz/tips/howto-linux-iptables-bypass-firewall-restriction.html
Comunicación directa entre nodos detrás de un NAT

Esta técnica aprovecha el "agujero" que se deja en el NAT al salir un paquete UDP.

Un ejemplo con tres máquinas. Bob y Alice quieren comunicarse entre si y Server es el que usamos para ver las IPs/Puertos públicos.

Server escucha en el puerto 9000 paquetes UDP. Vieno el output del comando "ss -unp" podemos ver quien se conecta al puerto 9000.
La función de Server la realizan los servidores STUN
Server$ nc -lu 9000
Bob$ echo "toc" | nc -p 58888 -u 54.93.249.162 9000
Anotamos que el ip/puerto público de Bob es: 54.93.229.24:58888

Alice$ echo "toc" | nc -p 53333 -u 54.93.249.162 9000
Anotamos que el ip/puerto público de Alice es: 82.230.120.113:53333


Server (STUN) devuelve la información vista (ip/puerto público) a los clientes, para que estos se la intercambien.

Ahora Alice va a enviar un paquete UDP a Bob (al ip/puerto público de Bob).
Va a utilizar su puerto local 53333 (el mismo que usó para conectar a Server) porque sabe que usando este puerto local se asegura tener el mismo puerto público en el router (coincide que se el mismo).
Luego se va a poner a escuchar en el puerto local que ha utilizado para enviar el paquete.
Alice$ echo "upd hole" | nc -p 53333 -u 54.93.229.24 58888
Alice$ nc -klu 53333
  (depende de la version de nc podremos poner -k, persistencia, o no)

Este comando no debe tardar mucho en enviarse, si no, se habrá cerrado el "hole" (tendremos que enviar otro paquete de apertura).
El tiempo parece que varia desde las decenas de segundos a los minutos (depende del NAT)
También depende del NAT tendremos que poner el puerto de origen o no será necesario (Restricted-Cone NAT vs Full-Cone NAT)
Bob$ echo "soy Bob" | nc -p 58888 -u 82.230.120.113 53333
  

Y aquí hacemos lo contrario, abrimos un agujero para que lleguen los mensajes de Alice:
Bob$ echo "upd hole" | nc -u -p 58888 82.230.120.113 53333
Bob$ nc -lu 58888

Alice$ echo "soy Alice" | nc -p 53333 -u 54.93.229.24 58888



# Usando un cliente STUN
Bob$ pystun -p 59999
NAT Type: Full Cone
External IP: 54.93.229.24
External Port: 59999

Alice$ pystun -p 56666
NAT Type: Restric NAT
External IP: 82.230.120.113
External Port: 56666
Alice$ echo "upd hole" | nc -p 56666 -u 54.93.229.24 59999
Alice$ nc -klu 56666

Bob$ echo "soy bob" | nc -p 59999 -u 82.230.120.113 56666

Y para que Alice envie mensajes a Bob:
Bob$ echo "upd hole" | nc -p 59999 -u 82.230.120.113 56666
Bob$ nc -lu 59999

Alice$ echo "soy alice" | nc -p 56666 -u 54.93.229.24 59999
