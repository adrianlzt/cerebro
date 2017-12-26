https://home.regit.org/netfilter-en/using-nfqueue-and-libnetfilter_queue/

Delegate the decision on packets to a userspace software


Enviar paquetes a una cola de NFQUEUE
sudo iptables -t nat -A POSTROUTING -p tcp --destination-port 9001 -j NFQUEUE --queue-num 1

Al meterlo en nat/POSTROUTING estaremos modificando el paquete en la última regla antes de salir (mirar https://www.frozentux.net/iptables-tutorial/images/tables_traverse.jpg)


Container docker que escucha en una cola NFQUEUE y pasa un programa scapy para modificar el paquete
https://github.com/milesrichardson/docker-nfqueue-scapy

Si queremos arrancarlo usando un .py local
docker run -it --rm --cap-add=NET_ADMIN --net=host -v "$PWD/nfqueue_listener.py:/nfqueue_listener.py" milesrichardson/nfqueue-scapy
