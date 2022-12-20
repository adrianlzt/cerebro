Ping con timestamp.
En algunos linux: ping -D host

Más genérico: ping 172.31.200.10 | while read pong; do echo "$(date): $pong"; done

Si queremos que un ping en ejecución nos muestre estadísticas le enviamos la señal SIGQUIT:
  pkill -3 ping
  control+\


Envia el ping a través de la interfaz eth3
ping -I eth3 google.es


# https://github.com/orf/gping
gráfico ncurses con los valores del ping a lo largo del tiempo, pudiendo comparar varios hosts simultáneamnete


# fping
más potente

Ejemplo enviando 100 paquetes ICMP, uno cada 10ms:
fping -p 10 -c 100 67.21.4.37
