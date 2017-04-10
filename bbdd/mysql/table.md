Info sobre su estructura:
SHOW CREATE TABLE [tablename];

Crear una dummy:
CREATE TABLE tablatest(columna varchar(10));

CREATE TABLE animals (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     PRIMARY KEY (id)
     ) ENGINE=INNODB;

Renombrar
ALTER TABLE tbl_name RENAME new_tbl_name;


ALTER [IGNORE] TABLE tbl_name
alter_specification [, alter_specification] ...

alter_specification:
	ADD [COLUMN] column_definition [FIRST | AFTER col_name ]
	| ADD [COLUMN] (column_definition,...)
| ADD INDEX [index_name] [index_type] (index_col_name,...)
	| ADD [CONSTRAINT [symbol]]
PRIMARY KEY [index_type] (index_col_name,...)
	| ADD [CONSTRAINT [symbol]]
	UNIQUE [index_name] [index_type] (index_col_name,...)
| ADD [FULLTEXT|SPATIAL] [index_name] (index_col_name,...)
	| ADD [CONSTRAINT [symbol]]
FOREIGN KEY [index_name] (index_col_name,...)
	[reference_definition]
	| ALTER [COLUMN] col_name {SET DEFAULT literal | DROP DEFAULT}
	| CHANGE [COLUMN] old_col_name column_definition
	[FIRST|AFTER col_name]
	| MODIFY [COLUMN] column_definition [FIRST | AFTER col_name]
	| DROP [COLUMN] col_name
	| DROP PRIMARY KEY
	| DROP INDEX index_name
	| DROP FOREIGN KEY fk_symbol
	| DISABLE KEYS
	| ENABLE KEYS
	| RENAME [TO] new_tbl_name
	| ORDER BY col_name
	| CONVERT TO CHARACTER SET charset_name [COLLATE collation_name]
	| [DEFAULT] CHARACTER SET charset_name [COLLATE collation_name]
	| DISCARD TABLESPACE
	| IMPORT TABLESPACE
	| table_options

Ejemplo, cambiar una columna de tipo INT a UNSIGNED INT NOT NULL:
alter table top change priority priority INT UNSIGNED NOT NULL;



Para ver los tipos de tablas (InnoDB, MyISAM, etc):
show table status;
