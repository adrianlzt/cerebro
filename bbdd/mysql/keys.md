# Mirar que claves apunta a una determinada tabla
use INFORMATION_SCHEMA;

select TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,
REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME from KEY_COLUMN_USAGE where
REFERENCED_TABLE_NAME = '<table>';

For a column, the same but add an and for the REFERENCED_COLUMN_NAME.
