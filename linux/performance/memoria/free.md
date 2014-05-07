             total       used       free     shared    buffers     cached
Mem:          7783       7580        202        231         63       1593
-/+ buffers/cache:       5923       1859
Swap:         3812          5       3807

Libre libre tenemos 202MiB

Mem%used     # memoria usada (incluyendo buffers y cached)
Mem%shared   # shared memory (IPC)
Mem%buffers  # bloques cacheados en memoria
Mem%cached   # paginas mapeadas en memoria, excluyendo buffers
-/+%used     # used - (buffers + cached): memoria no disponible
-/+%free     # free + (buffers + cached): memoria disponible


buffers: cache de bloques
almac / cached: buffers de ficheros
Ambos se almacenan en la estructura de kernel pagecache
