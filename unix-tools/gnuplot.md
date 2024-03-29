http://people.duke.edu/~hpgavin/gnuplot.html

$ gnuplot
gnuplot> plot sin(x)/x


Sintaxis básica:
plot 'fichero' using ejeX:ejeY with lines/points/linespoints
  Lo típico sería tener en la primer columna la fecha y en la segunda los datos, así que pondríamos: using 1:2
  El "with" es como queremos imprimir la gráfica: puntos, líneas, etc


Generalmente podríamos definir un fichero .gplot donde pondremos los valores de los ejes, fichero a leer, como imprimirlo, etc.



Cargar ficheros, deben estar separados por espacios en blanco.
O si usamos otro separador:
set datafile sep ','

plot  "force.dat" using 1:2 title 'Column',"force.dat" using 1:3 title 'Beam'

Varias líneas en el mismo plot
plot 'ls.dat' using 1:2, 'ls.dat' using 1:3, 'ls.dat' using 1:4 




# Script
Para mantener la ventana abierta:
gnuplot -p script.gnuplot



# Leyenda / key
http://gnuplot.sourceforge.net/docs_4.2/node192.html

Moverla arriba a la izquierda
set key left top


Si queremos poner algo específico (y que no coja el nombre del fichero)
plot "zilina.csv" using 1:2 with linespoints linestyle 1 title "competición"


# Time format
http://gnuplot.sourceforge.net/docs_4.2/node274.html



# Ejemplos

## Dato con fecha
Ejemplo pintando un fichero csv con datos y fechas en ISO (2021-11-27T09:10:27.000Z).
Pinta la línea uniendo los puntos.

set xdata time
set timefmt "%Y-%m-%dT%H:%M:%SZ"
set xtics format "%H:%M"
set mxtics 12
set datafile sep ','
set style line 1 \
    linecolor rgb '#0060ad' \
    linetype 1 linewidth 2 \
    pointtype 7 pointsize 0
plot "garmin_bpm.data" using 1:2 with linespoints linestyle 1


## Dos gráficos superpuestos
```
# Para poder pintar una gráfica sobre la otra
set multiplot

# Primera gráfica
set size 1,1
set origin 0,0

# Definimos el formato de la fecha
set xdata time
set timefmt "%Y-%m-%dT%H:%M:%SZ"
set xtics format "%H:%M"
set mxtics 12

# Fichero separado por comas
set datafile sep ','

# Estilos de las líneas que usaremos (azul y roja, línea sin puntos)
set style line 1 \
    linecolor rgb '#0060ad' \
    linetype 1 linewidth 2 \
    pointtype 7 pointsize 0
set style line 2 \
    linecolor rgb '#ff0000' \
    linetype 1 linewidth 2 \
    pointtype 7 pointsize 0

# Rango del eje y
set yrange [50:200]
# Título del eje Y
set ylabel "BPM"

# Imprimimos los datos del primer fichero (primera columna es la fecha)
# Usamos "competición" como nombre en la leyenda
plot "zilina.csv" using 1:2 with linespoints linestyle 1 title "competición"

# Segundo plot, en el mismo sitio, por lo que se pinta encima
set size 1,1
set origin 0,0
# Quitamos los ticks del eje X, para que no se solapen
set xtics format " "
set yrange [50:200]
# Movemos leyenda a la izquierda, para que no se solape
set key left top
# Mostramos segunda gráfica
plot "../training_brno_2021_11_20/entrenamiento.csv" using 1:2 with linespoints linestyle 2 title "entrenamiento"
```


## Imprimir imagen con cuantos sucesos por segundo ocurren en un log:
/var/log/syslog
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.daily' terminated (exit status: 1) (mailing output)
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.weekly' started


cat syslog | cut -d' ' -f1-4 | xargs -L1 -i$ date +%s -d$ | uniq -c  > /tmp/plot
gnuplot
gnuplot> plot '/tmp/plot' using 2:1 with lines


## Gnuplot script file for plotting data in file "force.dat"
set   autoscale                        # scale axes automatically
unset log                              # remove any log-scaling
unset label                            # remove any previous labels
set xtic auto                          # set xtics automatically
set ytic auto                          # set ytics automatically
set title "Force Deflection Data for a Beam and a Column"
set xlabel "Deflection (meters)"
set ylabel "Force (kN)"
set key 0.01,100
set label "Yield Point" at 0.003,260
set arrow from 0.0028,250 to 0.003,280
set xr [0.0:0.022]
set yr [0:325]
plot    "force.dat" using 1:2 title 'Column' with linespoints , \
      "force.dat" using 1:3 title 'Beam' with points


## Ejemplo donde tenemos un fichero con el formato
fecha valor1 valor2 valor3

set   autoscale                        # scale axes automatically
unset log                              # remove any log-scaling
unset label                            # remove any previous labels
set xtic auto                          # set xtics automatically
set ytic auto                          # set ytics automatically
set title "Titulo"
set xlabel "etiqueta x (meters)"
set ylabel "etiqueta y (kN)"
plot 'data' using 1:2 title "nr_free_pages" with lines, 'data' using 1:3 title "nr_alloc_batch" with lines, 'data' using 1:4 title "nr_inactive_anon" with lines
