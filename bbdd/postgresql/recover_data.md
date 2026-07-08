Usando delayed replication podemos tener una replica retrasada unos minutos, que nos podría server para consultar un dato rápidamente si lo acabamos de borrar.
Mejor método, usar backup point in time recovery.



# PDU
https://github.com/wublabdubdub/PDU-PostgreSQLDataUnloader

PDU helps recover offline PostgreSQL databases by reconstructing metadata, exporting tables, and reading WAL for targeted row recovery.

When a PostgreSQL instance cannot be started, normal SQL tools are no longer available. PDU, PostgreSQL Data Unloader, is an open source recovery tool for that situation. It reads PostgreSQL data files and WAL archives directly, without modifying the original data directory.

PDU can reconstruct database, schema, and table metadata while the database is offline. After the structure is discovered, it can export a single table, a schema, or a full database with one command. The output is CSV, which makes it practical to inspect recovered data or load it into another PostgreSQL instance.

For accidental DELETE and UPDATE operations, PDU can also recover selected row data from WAL. This recovery path does not rely on tuple remnants left before VACUUM. Instead, it reads WAL records available on a replica or in WAL archives, then reconstructs deleted rows or pre-update row versions from those records. The recovery window therefore depends on WAL availability.

Current capabilities include:

offline discovery of PostgreSQL database, schema, and table metadata
export of a single table, a schema, or a full database to CSV
direct reading of PostgreSQL heap and TOAST files
WAL-based recovery of deleted rows and pre-update row versions
recovery support for catalog corruption, accidental DELETE/UPDATE, and damaged data files
support for PostgreSQL 14 to 18
PDU is intended as an emergency recovery aid. It is not a replacement for backups, PITR, or existing PostgreSQL recovery practices.
