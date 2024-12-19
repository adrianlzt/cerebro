Concepto de containers databases y pluggable databases.
Cuando no es ninguno de estos se llaman "standalone".

Un contenedor puede tener varias PDBs.

select count(con_id) from v$containers where con_id < 3;
Si sale 1 soy un CDB (las CDBs están en el con_id=0 y luego tiene un template en con_id=1)
Si sale 0 es una PDB.

La info de las PDBs

```sql
COLUMN NAME FORMAT A8
SELECT NAME, CON_ID, DBID, CON_UID, GUID FROM V$CONTAINERS ORDER BY CON_ID;
```

Otra forma:

```sql
column pdb_name format a15
select pdb_id, pdb_name, status from dba_pdbs order by pdb_id;
```
