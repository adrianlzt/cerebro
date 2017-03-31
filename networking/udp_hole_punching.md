Comunicación directa entre nodos detrás de un NAT

Esta técnica aprovecha el "agujero" que se deja en el NAT al salir un paquete UDP.

Un ejemplo con tres máquinas. Bob y Alice quieren comunicarse entre si y Server es el que usamos para ver las IPs/Puertos públicos.

Server escucha en el puerto 9000 paquetes UDP. Vieno el output del comando "ss -unp" podemos ver quien se conecta al puerto 9000.
La función de Server la realizan los servidores STUN
Server$ nc -lu 9000
Bob$ echo "X" | nc -p 58888 -u 54.93.249.162 9000
Anotamos que el ip/puerto público de Bob es: 54.93.229.24:58888

Alice$ echo "X" | nc -p 54444 -u 54.93.249.162 9000
Anotamos que el ip/puerto público de Alice es: 82.230.120.113:54444


Server (STUN) pasaría la información del ip/puerto a cada uno de ellos y estos a su vez se la intercambiarían.

Ahora Alice va a enviar un paquete UDP a Bob. Va a utilizar el puerto local 54444 (el mismo que usó para conectar a Server) porque sabe que usando este se asegura tener el mismo pueto 
Alice$ sudo hping2 -c 1 -2 -s 54444 -u -p 58888 54.93.229.24
Alice$ nc -klu 51111

Bob$ echo "X" | nc -p 51111 -u 82.230.120.113 51111


Bob$ sudo hping2 -c 1 -2 -s 58888 -u -p 54444 82.230.120.113
Bob$ nc -lu 58888

Alice$ echo "Y" | nc -u 54.93.229.24 58888
