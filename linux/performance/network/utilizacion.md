# Utilizacion
sar -n DEV 1
  mirar "rxKB/s"/max "txKB/s"/max
  
ip -s link
/proc/net/dev
  RX/TX tput / max bandwidth
  nos da la suma total, tendríamos que calcular en el tiempo
  
iptraf
  nos saca tabla en ncurses por el consumo por interfaz con muchos detalles

iftop -i interfaz
  nos dice el ancho de banda consumido por cada conexion y el total

nethogs
  consumo de ancho de banda por proceso

nicstat
  "%Util"




# Saturacion
Paquetes "overrun" o "drop"

ifconfig
  "overruns", "dropped"

netstat -s
  "segments retransmited"

sar -n EDEV
  *drop and *fifo metrics
  
/proc/net/dev
  RX/TX "drop"
  
nicstat
  "Sat"
  
dynamic tracing for other TCP/IP stack queueing
  Dropped packets are included as both saturation and error indicators, since they can occur due to both types of events







# Errores
ifconfig
  mirar "errors", "dropped"
  
netstat -i
  mirar "RX-ERR"/"TX-ERR"
  
ip -s link
  mirar "errors"
  
sar -n EDEV
  mirar "rxerr/s" "txerr/s"
  
/proc/net/dev
  mirar "errs", "drop"
  
extra counters may be under /sys/class/net/..
