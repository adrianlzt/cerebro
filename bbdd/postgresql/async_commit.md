<https://www.postgresql.org/docs/current/wal-async-commit.html>
<https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT>

Asynchronous commit
Fast vs Safe

Esperar, o no (fast), a guardar los datos en el fichero en el FS.

No tenemos riesgo de inconsitencia, sí de pérdida de datos.

This can result in up to wal_buffers or wal_writer_delay \* 2 worth of data in an unexpected shutdown, but your database will not be corrupted

Asynchronous commit is an option that allows transactions to complete more quickly, at the cost that the most recent transactions may be lost if the database should crash.
In many applications this is an acceptable trade-off.

Se debe especificar a nivel global o en cada TX.

Para activar la asincronía (rápido):
set synchronous_commit = off;

Gemini:

With a high volume of inserts, the difference in disk I/O patterns between synchronous and asynchronous commit is significant.

Synchronous Commit (synchronous_commit = on)

At the disk I/O level, for each transaction commit (or for a group of transactions committing together), the backend process that executed the commit will:

1 Ensure the WAL records for the transaction are written from the in-memory WAL buffers to the operating system's kernel cache.
2 Execute an fsync() (or equivalent) system call on the WAL file.
3 Wait for the fsync() call to complete, which confirms the operating system has flushed the WAL data from its cache to the physical disk.
4 Only then does it return success to the client.

With a lot of inserts, this results in frequent, small, and potentially scattered fsync() operations, which can become a major performance bottleneck as the system must wait for physical disk I/O on every commit.

Asynchronous Commit (synchronous_commit = off)

At the disk I/O level, the backend process that executes the commit will:

1 Write the WAL records for the transaction into the in-memory WAL buffers.
2 Call XLogSetAsyncXactLSN() to notify the background WAL writer process that there is new WAL to be flushed.
3 Return success to the client immediately, without waiting for any disk I/O.

The actual disk I/O is handled entirely by the WAL writer process, which writes and flushes WAL to disk in larger, consolidated chunks. This happens periodically or when enough WAL has accumulated.

With a lot of inserts, this leads to:

• Fewer, but larger, write() and fsync() operations.
• The I/O is performed by a single, dedicated process (the WAL writer) rather than by many individual backend processes.

This batching of I/O is much more efficient and results in significantly higher transaction throughput, as individual transactions do not have to pay the latency cost of an fsync() call.
