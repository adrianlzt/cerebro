Utilidad de compresion que aprovecha la capacidad multicore.

pbzip2 -k -9 datafile
-k,--keep
  Keep input file, do not delete

-1,--fast ... -9,--best
  Set BWT block size to 100k .. 900k (default 900k).

Genera: datafile.bz2


Tambien como pipe:
comando | pbzip2 -c > imagen.cpio.bz


pbzip2 -p2 ...
  usar 2 procesadores
