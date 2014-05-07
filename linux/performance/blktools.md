http://www.cse.unsw.edu.au/~aaronc/iosched/doc/blktrace.html
Traspas 27,28,29

Paquete con muchas herramientas para tracear el disco a bajo nivel.

yum install blktrace
apt-get install blktrace

Flujo petición IO



## btrace ##
Información en tiempo real de las peticiones
Información de muy bajo nivel

Veremos eventos de escritura (W), de planificación (N cfq...)
Creación de la cola, terminar la cola (plug, unplug)

Podemos ver cada uno de los eventos de merge.
Merge es unir peticiones que son consecutivas.
El planificador se encarga de ordenar las peticiones para que luego se hagan merge.


## btt ##
sacar info de latencias a partir de una captura
btt -i a.trace.blktrace.0 -B btt-block
  nos generará btt-block_MINOR_MAJOR_[rwc].dat
    r: read   w: write   c: combined

## bno_plot ##
bno_plot btt-block_MINOR_MAJOR_[rwc].dat
  genera plot 3D a partir del fichero generado por btt
  Nos pinta una gráfica 3D con info de bloque, blocks per IO y tiempos
