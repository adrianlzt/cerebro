https://www.mankier.com/1/mongoperf

Testear velocidad de lectura de ficheros de 1MB, probando con 1, 2, 4, 8 y 16 hebras.
echo "{nThreads:16,fileSizeMB:1000,r:true}" | mongoperf

Testear velocidad de escritura de ficheros de 1MB, probando con 1, 2, 4, 8 y 16 hebras.
echo "{nThreads:16,fileSizeMB:1000,w:true}" | mongoperf

