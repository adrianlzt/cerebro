GNUPlot
sudo apt-get install gnuplot-x11

http://people.duke.edu/~hpgavin/gnuplot.html

$ gnuplot
gnuplot> plot sin(x)/x


Cargar ficheros, deben estar separados por espacios en blanco.
O si usamos otro separador:
set datafile sep ','

plot  "force.dat" using 1:2 title 'Column',"force.dat" using 1:3 title 'Beam'


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



# Script
Para mantener la ventana abierta:
gnuplot -p script.gnuplot
