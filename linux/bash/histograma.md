pacman -S gsl
tshark -nr input.pcap -T fields -e frame.len | gsl-histogram 0 1500 30

La sintaxis es min max bins, donde min y max son los valores mínimo y máximo de los datos, y bins es el número de intervalos en los que se dividirán los datos. En este caso, se divide el rango de valores de 0 a 1500 en 30 intervalos.
bins no es obligatorio.
