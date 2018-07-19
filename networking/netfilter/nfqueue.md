https://home.regit.org/netfilter-en/using-nfqueue-and-libnetfilter_queue/

Delegate the decision on packets to a userspace software

Cuidado si usamos la tabla nat, porque solo se enviará el primer paquete (no el ACK por ejemplo del SYN-SYN+ACK-ACK)


Enviar paquetes a una cola de NFQUEUE
sudo iptables -t nat -A POSTROUTING -p tcp --destination-port 9001 -j NFQUEUE --queue-num 1

Al meterlo en nat/POSTROUTING estaremos modificando el paquete en la última regla antes de salir (mirar https://www.frozentux.net/iptables-tutorial/images/tables_traverse.jpg)

Si queremos cogerlo antes de nada al entrar:
sudo iptables -t raw -A PREROUTING -p tcp --source-port 80 -s 52.57.153.0/32 -j NFQUEUE --queue-num 2


Container docker que escucha en una cola NFQUEUE y pasa un programa scapy para modificar el paquete
https://github.com/milesrichardson/docker-nfqueue-scapy

Si queremos arrancarlo usando un .py local
docker run -it --rm --cap-add=NET_ADMIN --net=host -v "$PWD/nfqueue_listener.py:/nfqueue_listener.py" milesrichardson/nfqueue-scapy


# Golang
github.com/AkihiroSuda/go-netfilter-queue

## Arch
sudo pacman -S libnetfilter_queue
go get github.com/chifflier/nfqueue-go/nfqueue                                                                                                                    git:(master|✚1…


go get github.com/AkihiroSuda/go-netfilter-queue
  este no funciona, problemas en el .h. Puede que sea facil de arreglar
  Parece más sencillo y limpio de usar.

