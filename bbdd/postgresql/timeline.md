https://www.highgo.ca/2021/11/01/the-postgresql-timeline-concept/

Los ficheros 00000003.history indican como se ha creado una timeline.
Tendremos el LSN de la timeline 2 de la que parte y el LSN del que partía el timeline 2.


https://www.interdb.jp/pg/pgsql10.html#:~:text=2.-,Timeline%20History%20File,branched%20off%20from%20and%20when.


ERROR: could not open file "pg_wal/00000002.history"
https://glctech.io/pg_wal-00000002/
https://fatdba.com/2020/10/20/could-not-send-replication-command-timeline_history-error-could-not-open-file-pg_wal-00xxxx-history/
