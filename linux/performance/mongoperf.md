https://www.mankier.com/1/mongoperf

Testear velocidad de lectura de ficheros de 1MB, probando con 1, 2, 4, 8 y 16 hebras.
echo "{nThreads:16,fileSizeMB:1000,r:true}" | mongoperf

Testear velocidad de escritura de ficheros de 1MB, probando con 1, 2, 4, 8 y 16 hebras.
echo "{nThreads:16,fileSizeMB:1000,w:true}" | mongoperf



Disco SSD SATA3


Lectura
echo "{nThreads:32,fileSizeMB:4000,r:true}" | mongoperf 
1 thread: 20MB/s
2 thread: 40MB/s
4 thread: 95MB/s
8 thread: 160MB/s
16 thread: 190MB/s
32 thread: 190MB/s

Escritura
echo "{nThreads:32,fileSizeMB:4000,w:true}" | mongoperf
Para todas
~250ops/s 0MB/s
