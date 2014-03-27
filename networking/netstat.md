Listening ports (tcp+udp+unix+ipv4+ipv6)
netstat -nlp 
  -n numeric
  -l listening
  -p process

Listening ports (tcp+udp+ipv4+ipv6)
netstat -nlptu

Listening ports (tcp+ipv4+ipv6)
netstat -nlpt

Listening ports (tcp+ipv4)
netstat -nlpt --inet


Listening ports (tcp+ipv4). Also show user and inode
netstat -nlpt --inet


Show all sockets tcp ipv4 sockets
netstat -ant --inet

Show timer info. Para time_wait nos dice el tiempo hasta cerrar la conexión
En una conexión establecida nos dice cuanto queda hasta cerrarla
netstat -ant --inet -o

Netstat continuo
netstat -ant -c
