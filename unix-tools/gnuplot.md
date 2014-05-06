http://people.duke.edu/~hpgavin/gnuplot.html

Imprimir imagen con cuantos sucesos por segundo ocurren en un log:


/var/log/syslog
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.daily' terminated (exit status: 1) (mailing output)
Oct  7 01:00:36 adrian-Presario anacron[15891]: Job `cron.weekly' started


cat syslog | cut -d' ' -f1-4 | xargs -L1 -i$ date +%s -d$ | uniq -c  > /tmp/plot
gnuplot
gnuplot> plot '/tmp/plot' using 2:1 with lines

Sintaxis básica:
plot 'fichero' using ejeX:ejeY with lines/points/linespoints
  Lo típico sería tener en la primer columna la fecha y en la segunda los datos, así que pondríamos: using 1:2
  El "with" es como queremos imprimir la gráfica: puntos, líneas, etc


Generalmente podríamos definir un fichero .gplot donde pondremos los valores de los ejes, fichero a leer, como imprimirlo, etc.


Ejemplo:
# Gnuplot script file for plotting data in file "force.dat"
# This file is called   force.p
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


Ejemplo donde tenemos un fichero con el formato
fecha valor1 valor2 valor3

# grafica.gplot
set   autoscale                        # scale axes automatically
unset log                              # remove any log-scaling
unset label                            # remove any previous labels
set xtic auto                          # set xtics automatically
set ytic auto                          # set ytics automatically
set title "Titulo"
set xlabel "etiqueta x (meters)"
set ylabel "etiqueta y (kN)"
plot 'data' using 1:2 title "nr_free_pages" with lines, 'data' using 1:3 title "nr_alloc_batch" with lines, 'data' using 1:4 title "nr_inactive_anon" with lines

gnuplot -persist grafica.gplot
