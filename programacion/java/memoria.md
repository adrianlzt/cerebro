La memoria en Java se almacena en tres zonas distintas:
Eden (young gen)
Survivor (young gen)
Old Gen

Estas tres memorias consumen el Heap.


# Garbage collectos
PS Scavenge (young gen): mueve de Eden a Survivor y de este a Old Gen
PS MarkSweep (old gen): borra de old gen


# Heap dump
Con ayuda de VisualVM podemos tomar un heap dump.
Luego podemos cargarlo apara analizarlo en el propio VisualVM.
O abrir el fichero desde eclipse (nos sugerirá instalar el plugin MAT para poder analizar el dump).
Podemos arrancar directamente eclipse-mat.
En el dir donde esté el .hprof se generarán unos .zip que son las páginas webs que vemos (por si queremos compartir el reporte)

Eclipse no puede hacer un análisis para detectar un posible memory leak.
También puede hacer otro análisis para detectar posibles objetos duplicados, etc.

mirar priv-adrianRepo/programacion/java/jxray_decompiler.md
Analizador de pago de heap dumps
Parece peor que Eclipse. En un problema con jolokia+jboss, eclipse lo detectó claramente. jxray no deja claro cual es el problema.


Obtener dump con jmap:
jmap -dump:format=b,file=/tmp/dump.hprof.jolokia 46623

Si nos da el error: Unable to open socket file: target process not responding or HotSpot VM not loaded
Ejecutar el jmap con el user que tiene corriendo el java
sudo -u USER jmap -dump...

Si el pid no contesta podemos forzarlo con:
jmap -F -dump:format=b,file=/tmp/dump.hprof.jolokia 46623
