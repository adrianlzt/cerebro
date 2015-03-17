http://veithen.github.io/2014/01/01/how-tcp-backlog-works-in-linux.html
  explicacion del backlog usando codigo del kernel
http://stackoverflow.com/questions/12893379/listen-queue-length-in-socket-programing-in-c
http://blog.dubbelboer.com/2012/04/09/syn-cookies.html#a_reasonably_backlog_size
  busqueda de como se comprueba el tamaño del backlog y donde se define, usando codigo kernel
syn_cookies.md

Estas dos colas son por cada puerto.

------------        ------------------       ---------------
| Clientes | ---->  |Backlog syn-recv| ----> |Backlog estab| ----> Servidor
-----------         ------------------       ---------------

Cola backlog estab:
  Valor máximo: /proc/sys/net/core/somaxconn
  Valor por aplicación: listen(int sockfd, int backlog)
    Consultar el backlog:
      sysdig proc.name=multi and evt.type=listen
        ...listen fd=3(<4>) backlog=3
      ss -antp sport = :5060
        Send-Q es el valor del backlog
      nginx por defecto pone backlog a 511
  Ocupación de la cola:
    ss -antp sport = :5060
      Recv-Q es el número de elementos en la cola

Cola backlog syn-recv (/proc/sys/net/ipv4/tcp_syncookies=1, por defecto):
  Cola sync-recv virtualmente infinita.
  Con ss podemos ver cada conexión que ha enviado un SYN, pero la cola no se llena.
  Las conexiones válidas, que contestan con la ACK correctamente, son aceptadas.

Cola backlog syn-recv (/proc/sys/net/ipv4/tcp_syncookies=0):
  Valor máximo: /proc/sys/net/ipv4/tcp_max_syn_backlog
  Siempre que este a 0: /proc/sys/net/ipv4/tcp_syncookies
  Tamaño de la cola, serán las conexiones en estado SYN-RECV
    ss -antp sport = :9999 | grep SYN-RECV
   El tamaño de la cola será el valor de backlog+1 redondeado a la siguiente potencia de 2
     http://lxr.free-electrons.com/source/net/core/request_sock.c#L46
     backlog=4096 nos dará un tamaño de cola de 8192 (4097 redondeado a la siguiente potencia de 2)
     Memoria de la cola: 64bit system the size of the request_sock is 56 bytes+8bytes=64bytes per entry. 4096 entries would only take up 0.25 MB.


Clientes en la cola backlog:
  Los clientes aquí (tras haber hecho el tripe hand-shake (THS)), si envian datos reciben un ACK por parte del sistema.
  La info que vayan enviando se va almacenando en la cola Recv-Q (cada valor equivale a un byte). Ej.:
    State      Recv-Q Send-Q        Local Address:Port          Peer Address:Port
    ESTAB      20     0             192.168.33.10:9999          192.168.33.1:49967


Cuando la cola backlog está llena, sucede lo siguiente:
  Cliente envía SYN
  Servidor contesta SYN+ACK
  Cliente envía ACK, pero el servidor lo rechaza (ignora) y pone +1 a los siguientes contadores: TcpExtListenOverflows y TcpExtListenDrops
    nstat -sz TcpExtListenDrops TcpExtListenOverflows
  Como el servidor no ha recibido el ACK del cliente (porque lo ha ignorado), repite la operación de enviar el SYN+ACK.
    Esta operación se realiza el número de veces definido en /proc/sys/net/ipv4/tcp_synack_retries , por defecto 5
    Los tiempos son exponenciales: 1s, 2s, 4s, 8s, 16s y 32s (63s en total)
    Tras la última espera de 32s se saca a la conexión de la cola syn-recv


Clientes en la cola sync-rev:
  El cliente piensa que ha está conectado (estado ESTAB visto con ss en el lado cliente), porque ha relizado el triple HS.
  El servidor en realidad lo tiene en la cola SYN-RECV, porque está rechazando su último ACK.
  El cliente, tras el THS intenta enviar sus datos (paquete PSH+ACK). Como estos no son ackeados, lo va reintentando.
  También, de vez en cuando recibe por parte del servidor de nuevo el paquete SYN+ACK, al que vuelve a contestar con ACK.
  El éxito de que el cliente logre contactar con el servidor dependerá de su insistencia, que logre enviar su dato cuando le pasen a la cola estab


Cola syn-recv llena (/proc/sys/net/ipv4/tcp_syncookies=1):
  En realidad aquí parece que no existe una cola como tal.
  

Cola syn-recv llena (/proc/sys/net/ipv4/tcp_syncookies=0):
  Cliente envia un SYN
  El servidor no contesta (no veo ningún contandor que se incremente con nstat)
  Por defecto la syscall connect se queda reintentando tantas veces como diga /proc/sys/net/ipv4/tcp_syn_retries y de forma exponencial



/proc/sys/net/ipv4/tcp_max_syn_backlog
Maximal number of remembered connection requests, which are still did not receive an acknowledgment from connecting client.
Default value is 1024 for systems with more than 128Mb of memory, and 128 for low memory machines. If server suffers of overload, try to increase this number.
listen(sockfd, 1)
Con esto podremos tener una petición siendo procesada, dos en la cola ESTAB y los que determine el sistema en la cola SYN-RECV.
No se porque, pero el tamaño de la cola ESTAB es backlog+1

/proc/sys/net/core/somaxconn
Limit of socket listen() backlog, known in userspace as SOMAXCONN. Defaults to 128. See also tcp_max_syn_backlog for additional tuning for TCP sockets.
somaxconn permite una cola backlog máxima de valor+1 en cualquier programa, da igual que el programa defina un valor superior en listen().


En Recv-Q nos indicará el tamaño de esa cola. NOTA: si una conexión se establece, se marca en la cola, si matamos esa conex y establecemos luego otra, el contador de pondrá a 2. La idea es que el contador no sabe si el cliente terminó la conexión. Los nuevos elemtnos se quedarán en la cola SYN-RECV si la cola de backlog está llena.


Si tenemos un servidor que atiende a múltiples peticiones (ej.: http://haifux.org/lectures/171/multi.c) esté mantendrá las conexiones y no se llenará la backlog.

# Pruebas

Podemos modificar https://www.cs.utah.edu/~swalton/listings/sockets/programs/part2/chap6/simple-server.c para solo pasar '1' como parámetro backlog de la llamada liste().
Luego conectamos (nc 127.0.0.1 9999) un cliente, y vemos que se pone en estado ESTAB
watch -d -n 1 "ss -antp sport = :9999"

Para los clientes meter una traza antes y otra después de la syscall connect(), así podemos ver cuando ha enviado el SYN (antes de connect) y cuando ha recibido el SYN+ACK (traza después de connect)

Conectamos un segundo cliente y vemos que tambien se pone en estado ESTAB (este cliente ya estaría en la cola backlog).
Conectamos un tercer cliente, este vemos que también se pone en ESTAB (por eso digo que las colas tienen un tamaño n+1).
Conectamos un cuarto cliente, y como no cabe en la cola, se va a la cola SYN-RECV (este será el estado en que vemos la conexión en el servidor, el servidor a recibido el ACK del cliente pero lo ha ignorado. En el cliente se verá ESTAB, ya que ha recibido el SYN+ACK y enviado su ACK)
Si seguimos metiendo clientes se llenará la cola SYN-RECV y los clientes enviarán el SYN pero no recibirán respuesta.

Según el servidor vaya procesando elementos irá pasando tareas de la cola SYN-RECV a la cola ESTAB.



No enviar paquetes ACK ni RST (para simular un ataque SYN flood):
sudo iptables -A OUTPUT -p tcp --tcp-flags ALL ACK -d 192.168.33.10 --dport 9999 -j DROP
sudo iptables -A OUTPUT -p tcp --tcp-flags ALL RST -d 192.168.33.10 --dport 9999 -j DROP

Enviar un paquete SYN (necesario haber puesto las reglas anteriores para que linux no envie automaticamente el RST):
sudo hping3 -p 9999 -S -c 1 192.168.33.10

O con scapy:
send(IP(dst="192.168.33.10")/TCP(sport=40000,dport=9999))



# Dudas
somaxconn aplica a sockets?

