Fully transactional and ACID compliant
  Atomicity
  Consistency
  Isolation
  Durability

Uses row level locking

Support all four isolation levels

Support foreign keys and MVCC

Both data and indexes cached by mysqld in a buffer pool

Reliable crash recovery

Users a global table-space file and two redo log files

MyISAM está quedando anticuada. Puede ser válida en sistemas viejos/lentos.



InnoDB architecture:

Memoria
  Buffer pool: cached data and indexes, stored in pages
  Buffer pool envía los datos de insert, delete y update a Log Buffer
  Log buffer: transaction data writes

Disk
  El buffer pool hace "checkpoint" a los Data files (data, indexes, undo log)
  El log buffer hace commit a los redo log (suele haber dos)


Cada cuanto sincronicemos la memoria con el disco puede producir una gran mejora. La parte mala es si se cae el nodo antes de haber flusheado al disco (perdemos los datos)



# Clustered Index #
Siempre crear una primary key en cada tabla.
