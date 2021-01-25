http://www.cyberciti.biz/files/ss.html
http://git.kernel.org/cgit/linux/kernel/git/shemminger/iproute2.git/tree/misc/ss.c

ss  is  used to dump socket statistics. It allows showing information similar to netstat.  It can display more TCP and state informations than other tools.

ss utiliza la API netlink para obtener la info de red (parece que es una opción más rápida).
Mientras que netstat parsea /proc/net
https://pcarleton.com/2018/05/31/netstat-vs-ss/
https://github.com/shirou/gopsutil/issues/695
En go: https://github.com/raboof/connbeat/blob/master/sockets/tcp_diag/tcp_diag.go

Suele venir con el paquete iproute2


Es el nuevo netstat (que quedará deprecated)

ss [ OPTIONS ] [ state TCP-STATE ] [ EXPRESSION ]

ss
 -ti      # estadisticas detalladas de TCP
  %wscale # multiplicativo del window size
  %rto    # Retransmission Timeout
  %rtt    # Round-Trip Time
  %ato    # ACK Timeout
  %mss    # Maximum Segment Size (normalmente 1500-40-20=1440)
  %cwnd   # Congestion Window
  %ssthresh  # Slow Start Threshold

ss -s
  estadisticas
  parecido a /proc/net/sockstat
Más info: nstat lnstat

ss -a
  muestra todas las conexiones (establecidas, listen, timewait, etc)
  sin -a muestra todo menos listening, syn-recv, time-wait and closed sockets

ss -l
  muestra solo conexiones listen

ss -at
  muestra los timer de las conexiones. 2xMSL para timewait, el keepalive de las ESTAB, etc

ss -ap
  muestra los procesos y pids asociados a las conexiones

ss -ntpo
  -o muestra info de timeouts

ss -o state established '( dport = :ssh or sport = :ssh )'
  Display all established ssh connections.

ss -ant sport = :9999
  mostrar todas las conexiones tcp, sin traducir y que el source port sea 9999

ss -o state fin-wait-1 '( sport = :http or sport = :https )' dst 193.233.7/24
  List all the tcp sockets in state FIN-WAIT-1 for our apache to network 193.233.7/24 and look at their timers.

ss -a exclude listening
  muestra todas las conex menos las listening

ss -a -f unix
  estado unix sockets
  -l para sockets listening

state / exclude / excl:
  established
  syn-sent
  syn-recv / syn-rcv
  fin-wait-1
  fin-wait-2
  time-wait
  unconnected / close / closed
  close-wait
  last-ack
  listening
  closing

  all
  bucket - for TCP minisockets (TIME-WAIT|SYN-RECV)
  big - all except for minisockets
  connected - not closed and not listening
  synchronized - connected and not SYN-SENT


EXPRESSION

  dst prefix:port
  src prefix:port
  src unix:STRING
  src link:protocol:ifindex
  src nl:channel:pid

  prefix puede ser: 10.0.0.1 o 10.0.0.0/24, etc
  El puerto no es obligatorio (lo tomará como todos)

  dport >= :1024
  dport != :22
  sport < :32000
  
  <, >, =, >=, =, ==, !=, eq, ge, lt, ne
  and, or, not para separar expresiones
  no olvidar de escapar expresiones


Columas:
ss -ntp

Send-Q
  Para estado LISTEN, significa la cola backlog (conexiones establecidas pendientes de contestar). Esta cola está limitada por el valor del argumento 'backlog' pasado en la syscall listen() y truncado por somaxconn (valor máximo definido por el sistema).

  Para conexiones establecidas, es la cantidad de bytes en espera de ser reportados a la aplicación.

Recv-Q
  Para conexiones establecidas, cantidad de bytes a la espera de ser enviados al cliente (esto lo induzco por como funciona Send-Q)
