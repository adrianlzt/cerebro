Repo oficial de sqlite: <http://repo.or.cz/sqlite.git>

repl online: <https://www.tutorialspoint.com/execute_sql_online.php>

sqlitebrowser - Editor X11 para bases de datos SQLite

Otro browser ncurses: <https://github.com/ZetloStudio/ZeQLplus> Release 1.0.0 Abril 2023: <https://github.com/ZetloStudio/ZeQLplus/releases/download/v1.0.0/zeql_linux_x86_64.zip> Fichero binario estático.

Muy básico y encima falla. Mirando la sqlite de mlflow no me mostraba una columna que tenía.

Los paquetes sqlite y sqlite3 traen un cliente para ver/editar una base de datos sqlite.
Asegurarse que usamos la versión (2.x o 3.x) de sqlite adecuada.

Ejecutar comando

```bash
sqlite3 fichero.db "select 1"
```

Para abrir una base de datos sqlite:

```bash
sqlite3 bd.sqlite3

.tables # como SHOW TABLES en mysql
.schema zombies # como DESCRIBE en mysql
SELECT * FROM zombies;
.dbinfo # info sobre la databsae
.databases # para mostrar las que tenemos abiertas y como (fichero, tcp, etc)

# Mostrar headers:
.header on

# Modo columna (en vez de usar "|" como separadores, mostrar como psql):
.mode column
```

Configurar por defecto estas opciones con ~/.sqliterc

```
.headers on
.mode column
.nullvalue (NULL)
```

Usar este, en vez de column, para no cortar las líneas por una anchura determnada.

```
.mode list
```

Si no tenemos los helpers ".\*" podemos navegar por:

```bash
SELECT* FROM sqlite_master WHERE type='table';
```

# Time/Date

<https://www.tutorialspoint.com/sqlite/sqlite_date_time.htm>
'now' equivalente al now() de postgres (poner con comillas)

SQLite does not have a storage class set aside for storing dates and/or times. Instead, the built-in Date And Time Functions of SQLite are capable of storing dates and times as TEXT, REAL, or INTEGER values:

# Develop

<http://repo.or.cz/sqlite.git/blob/HEAD:/src/shell.c>
Esta es la cli que arranca cuando hacemos ejecutamos sqlite3

# Python

Esta el la standard library
<https://docs.python.org/3.8/library/sqlite3.html>

```python
import sqlite3
conn = sqlite3.connect('example.db')
cursor.execute("select * from sqlite_master")

# Database activada:
cursor.execute("PRAGMA database_list;").fetchall()[0][2]
```

# Extraer el valor de una columna

```bash
sqlite3 -batch your_database.db <<EOF > extracted_base64.txt
.headers off
.mode list
SELECT base64_data FROM your_table WHERE id = 1;
EOF
```

# dump

```bash
$ sqlite
.output dump.sql
.dump
```

```sql
.mode insert <target_table_name>
.out file.sql
select * from MyTable;
```

# Extender sqlite

<http://charlesleifer.com/blog/extending-sqlite-with-python/>

Podemos conectar sqlite con cualquier software definiendo una serie de funciones.
Luego usaremos el lenguaje sql para comunicarnos con eso.
Un ejemplo podría ser git, y hacer "select author from commits"

# Conectar sqlite con otras sqlite

Ejemplo mergeando dos sqlites en una:
```
sqlite3 combined.db <<'EOF'
ATTACH 'zabbix_snapshot.db' AS db1;
ATTACH 'ttech-zabbixproxy2-20260319.db' AS db2;
SELECT * INTO zabbix_events FROM db1.zabbix_events;
SELECT * INTO zabbix_hosts FROM db1.zabbix_hosts;
SELECT * INTO zabbix_templates FROM db1.zabbix_templates;
SELECT * INTO zabbix_history FROM db1.zabbix_history;
SELECT * INTO zabbix_items FROM db1.zabbix_items;
SELECT * INTO zabbix_trends FROM db1.zabbix_trends;
SELECT * INTO zabbix_host_groups FROM db1.zabbix_host_groups;
SELECT * INTO zabbix_snapshot_meta FROM db1.zabbix_snapshot_meta;
SELECT * INTO zabbix_triggers FROM db1.zabbix_triggers;
SELECT * INTO journal_logs FROM db2.journal_logs;
DETACH db1;
DETACH db2;
EOF
```

# Tipos de datos

NULL. The value is a NULL value.
INTEGER. The value is a signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
REAL. The value is a floating point value, stored as an 8-byte IEEE floating point number.
TEXT. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
BLOB. The value is a blob of data, stored exactly as it was input.

# CTEs

<https://www.sqlitetutorial.net/sqlite-cte/>

# JSON

<https://sqlite.org/json1.html>

```sql
WHERE json_column ->> '$.key' = 'value';
```
