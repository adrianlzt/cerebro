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

Eclipse no puede hacer un análisis para detectar un posible memory leak.
También puede hacer otro análisis para detectar posibles objetos duplicados, etc.


Obtener dump con jmap:
jmap -dump:file=/tmp/dump.hprof.jolokia 46623

Si el pid no contesta podemos forzarlo con:
jmap -F -dump:file=/tmp/dump.hprof.jolokia 46623
