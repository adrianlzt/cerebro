https://oss.oetiker.ch/rrdtool/doc/rrdinfo.en.html
man rrdtutorial

Con rrdtool podemos leer estos ficheros:

rrdtool dump fichero.rrd > dump_texto_plano.txt

Ultima fecha añadida:
rrdtool last response_time.rrd


Crear un fichero rrd:
rrdtool create temperature.rrd --step 60 DS:temp:GAUGE:120:-273:5000 RRA:MAX:0.5:1:1500
  llegarán métricas cada 60s
  heartbeat de 120s (si no llega un valor en 120s pondrá un 0
  valor mínimo -273 máximo 5000
  almacena 1500 puntos en la RRD, la 1501 sobreescribirá (el 0.5:1 son datos internos que no tenemos que tocar)


Meter valores
rrdtool update temperature.rrd N:VALOR
  Al poner "N" me pone la fecha actual


Graficar:
rrdtool graph
  Sintaxis un tanto compleja. Mirar 'man rrdgraph_examples'


Para obtener datos:
rrdtool fetch
  man rrdfetch

rrdtool fetch cpu.rrd AVERAGE
  obtener las métricas del último día con la máxima resolución posible

rrdtool fetch cpu.rrd AVERAGE -s -2h
  ver solo los valores de las ultimas 2 horas
