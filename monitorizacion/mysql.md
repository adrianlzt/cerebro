You can compare the number of internal on-disk temporary tables created to the total number of internal temporary tables created by comparing the values of the Created_tmp_disk_tables and Created_tmp_tables variables.

mysql> show global status like 'Created%tables';
| Created_tmp_disk_tables | 476088   |
| Created_tmp_tables      | 26317055 

Las tablas que se estén creando en disco (si no es un disco en memoria) estarán ralentizando enormemente el procesado de querys.


Chequeos sacados de como lo hace monitis.com

Cache:
  Binary log cache hit rate  80
  Connections cache usage  95
  Log cache hit rate  80
  Tmp cache hit rate  80

InnoDB
  Buffer pool hit rate 95
  Buffer pool usage 80
  Cache write wait rate 90

Key cache
  Hit rate 95
  Writes rate 75

Other
  Heavy join hit rate 90
  Indexes usage 80
  Slow queries rate 90
  Table cache hit rate 85
  Table lock contention 40

Query cache
  Hit rate 80
  Prunes rate 90

Thread
  Slow threads rate 90
  Thread cache hit rate 90
