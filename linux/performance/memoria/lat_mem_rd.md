lat_mem_rd -N 1 -P 1 256M 256 &> lat.txt # latencia L1, L2, L3 y RAM
xgraph -lnx lat.txt                      # grafico de latencias

Latencia en bloques de 256Bytes hasta 256MiB, lo va a hacer con el mapa de memoria completo, primero con la L1, luego L2, L3 y RAM.
En el diagrama se va observando los distintos saltos según va pasando entre las caches.
La gráfica es de latencia, menor es mejor.
