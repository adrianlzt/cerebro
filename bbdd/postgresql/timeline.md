https://www.highgo.ca/2021/11/01/the-postgresql-timeline-concept/

Los ficheros 00000003.history indican como se ha creado una timeline.
Tendremos el LSN de la timeline 2 de la que parte y el LSN del que partía el timeline 2.


https://www.interdb.jp/pg/pgsql10.html#:~:text=2.-,Timeline%20History%20File,branched%20off%20from%20and%20when.


ERROR: could not open file "pg_wal/00000002.history"
https://glctech.io/pg_wal-00000002/
https://fatdba.com/2020/10/20/could-not-send-replication-command-timeline_history-error-could-not-open-file-pg_wal-00xxxx-history/

Parece que al hacer un pg_basebackup, como parte final se envía al server el comando TIMELINE_HISTORY.
Ese comando lo que hace es devolver el fichero "NNNNNNN.history" que tenga el server: https://www.postgresql.org/docs/current/protocol-replication.html#PROTOCOL-REPLICATION-TIMELINE-HISTORY
Ese fichero contiene la historia de la timeline.

Haciendo un pg_basebackup en v16.1 no veo que se ejecute ese comando TIMELINE_HISTORY.
