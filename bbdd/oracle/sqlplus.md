<https://docs.oracle.com/cd/B25329_01/doc/appdev.102/b25108/xedev_sqlplus.htm>

# Install

Arch
yay oracle-instantclient-sqlplus
Necesitamos meter config en /etc/pacman.conf para bajarnos binarios compilados (temas de licencias de Oracle)

# Uso

sqlplus hr/my_hr_password@host_computer_name:1521/SID

Para conectar como admin, con el usuario oracle:

```
ORACLE_HOME=/u01/app/oracle/product/19.0.0.0/dbhome_1 /u01/app/oracle/product/19.0.0.0/dbhome_1/bin/sqlplus / as sysdba
```

Ejemplo en una centos 7:
ORACLE_HOME=/opt/oracle/product/21c/dbhomeXE /opt/oracle/product/21c/dbhomeXE/bin/sqlplus "oracle_user/password@localhost:1539/XE"

El formato es:

```
usuario/password@host:puerto/SID
```

echo "select 1" | sqlplus '/as sysdba'

# Mejorar visualización

Para que se vean bien las tablas:

```sql
set sqlprompt "_user'@'_connect_identifier> "
set linesize 200
set pagesize 1000
set trimspool on
set history on
```

Ver el history: history

Editar: history 2 edit

# Comandos

Relanzar la última sentencia:

```sql
r
```

Editar la última sentencia:

```sql
ed
```

Generará un fichero temporal con la query, para ejecutarla:

```sql
@filename.buf
```

# Analizar tablas

Mostar las tablas

```sql
select table_name from user_tables;
```

Mostrar el schema de una tabla

```sql
desc table_name;
```
