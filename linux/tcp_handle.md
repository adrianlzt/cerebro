https://theojulienne.io/2020/07/03/scaling-linux-services-before-accepting-connections.html

Cuando llega un SYN, se almacena la conex en la cola "SYN backlog"
El server contesta con SYN+ACK.

Cuando llega el ACK del cliente, la conex pasa a la cola "Accept queue", de donde se sacan con la syscall "accept"
