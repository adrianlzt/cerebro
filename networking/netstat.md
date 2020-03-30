ss utiliza la API netlink para obtener la info de red (parece que es una opción más rápida).
Mientras que netstat parsea /proc/net
https://pcarleton.com/2018/05/31/netstat-vs-ss/
https://github.com/shirou/gopsutil/issues/695


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


netstat
  %Recv-Q  # bytes en cola de recepcion (>0 indica saturacion) IMPORTANTE! Valores sostenidos mayores que 0 problema
  %Send-Q  # bytes en cola de envío (>0 indica saturacion) IMPORTANTE! Valores sostenidos mayores que 0 problema
 -s     # estadisticas detalladas por protocolo
 -i     # estadisticas por interfaz
  %OK     # pkts recibidos correctamente
  %ERR    # pkts recibidos pero checksum incorrecto (mala conexion)
            idea de que el canal es malo
  %DRP    # pkts eliminados por buffer lleno (indica saturacion)
            no había espacio en cola. indica saturación, la cola también nos indicará que está llena. esto si que hay que vigiliar y tunear si fuese necesario
  %OVR    # pkts descartados por el kernel (indica máquina muy ocupada)
            cpu no da a basto para procesar (cpu colapsada, o porque no da a basto). nada frecuente.

netstat -r
  Muestra las rutas
Si una ruta es 0.0.0.0/1 pondrá "default", aunque esa no sea la de por defecto.
De esta manera podríamos tener varias default.

$ sudo ip r add 0.0.0.0/25 via 192.168.1.1
$ sudo ip r add 0.0.0.0/26 via 192.168.1.1
$ netstat -r
Tabla de rutas IP del núcleo
Destino         Pasarela        Genmask         Indic   MSS Ventana irtt Interfaz
default         192.168.1.1     255.255.255.192 UG        0 0          0 wlan1
default         192.168.1.1     255.255.255.128 UG        0 0          0 wlan1
default         192.168.1.1     0.0.0.0         UG        0 0          0 wlan1

