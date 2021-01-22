# Schema
CREATE SCHEMA xxx;


# Tables
create table SAPABAP1.EDIDS ( STATUS int, STAMID varchar(20), STAMNO varchar(20), DOCNUM int, COUNTR int);

# Mirar columnas de una tabla
\dc tabla

O el comando que usa por debajo:
SELECT
  SUBSTR(column_name, 1, 6) "Column Name",
  data_type_name "Type",
  SUBSTR(map(length,NULL,'-',TO_CHAR(length) )|| map(scale, NULL,'',0,'', ','||TO_CHAR(scale)), 1, 2) "Length",
  map (is_nullable, 'TRUE', 'YES', 'NO') "Nullable",
FROM
  SYS.TABLE_COLUMNS
WHERE
  SCHEMA_NAME = 'AAAA'
  AND table_name = 'BBBB'
ORDER BY position;

