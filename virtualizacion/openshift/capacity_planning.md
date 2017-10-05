La guía de instalación para la versión 3.5 maneja estos valores máximos:
Maximum nodes per cluster 1000
Maximum pods per cluster 120000
Maximum pods per nodes 250
Maximum pods per core 10

Ejemplo, para 10 cores/nodo:
10 cores/nodo * 10 pods/core = 100 PODs/nodo

Si tenemos 100GB de RAM en cada nodo:
100 GB/nodo / 100 PODs/nodo = 1GB/POD
