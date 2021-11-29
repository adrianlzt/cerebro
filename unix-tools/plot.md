GNUPlot
sudo apt-get install gnuplot-x11

http://people.duke.edu/~hpgavin/gnuplot.html

$ gnuplot
gnuplot> plot sin(x)/x


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
