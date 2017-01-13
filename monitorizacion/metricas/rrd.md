https://oss.oetiker.ch/rrdtool/doc/rrdinfo.en.html
man rrdtutorial

Con rrdtool podemos leer estos ficheros:

rrdtool dump fichero.rrd dump.xml
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

Consolidación:
http://www.vandenbogaerdt.nl/rrdtool/min-avg-max.php



# Crear graficas
https://oss.oetiker.ch/rrdtool/doc/rrdgraph_examples.en.html

Para saber los nombres de los ds:
rrdtool info Interface_TenGigE0_0_2_3.400.rrd | less
ds[1].index = 0  -> el ds se llama "1"



rrdtool graph imagen.png --end 1484218667 --start 1484204267 --width 800 --height 800 DEF:inbytes=Interface_TenGigE0_0_2_3.400.rrd:1:MAX CDEF:intraffic=inbytes,8,* CDEF:inmb=intraffic,1000000,/ AREA:inmb#00e060:"in            " GPRINT:intraffic:LAST:"%7.1lf %sbit/s last"


Esto lo que hace es generar la imagen imagen.png a partir del fichero rrd Interface_TenGigE0_0_2_3.400.rrd
Del fichero se coge el DS (data source) 1.
Los valores de este DS se consolidan con la función (CF) MAX (las posibles son AVERAGE, MINIMUM, MAXIMUM, and LAST)
En este ejemplo por tanto, si se consolidan varios puntos, se coge el mayor de ellos para generar el punto consolidado (CDP)
