traspas ramses dia3-io/io step-26

Visualización de patrones IO (ejecuta blktrace internamente)

seekwatcher -t TRACEFILE -o PNGFILE -p 'CMD' -d DEVICE
seekwatcher -t a.trace -o a.png -p 'spew -i 100 10M FILE' -d /dev/sda
  genera trazas 'blktrace' y PNG de la IO generada por un comando


Disk IO / offset: punto por cada sector que lee.
  puntos seguidos, lectura/escritura secuencial
  puntos aleatorios, lectura/escritura aleatoria
  

Seek count: número de posicionamientos del cabezal que ha habido que hacer
  io secuencial, pocos posicionamientos
  io aleatoria, más posicionamientos


seekwatcher -t TRACEFILE -o MPEGFILE --movie
  le pasamos un tracefile y nos genera un video de como se va escribiendo

