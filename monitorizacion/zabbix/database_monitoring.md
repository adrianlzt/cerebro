https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/odbc_checks

Hace falta tener instalado y configurado ODBC
Para saber el nombre que poner en "Driver" mirar en /etc/odbcinst.ini
No hace falta reiniciar Zabbix.
Si la máquina esta monitorizada por un proxy, deberá ser el proxy quien tenga odbc configurado.

Para MSSQL: https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver15#redhat18

Para MySQL:
yum install -y unixODBC unixODBC-devel mysql-connector-odbc

vi /etc/odbc.ini
[nombreKey]
Description = Some MySQL Database
Driver      = MySQL
Server      = midatabasehost
User        = zabbix-server
Password    = zabbix-server
Port        = 3306
Database    = zabbix-server


Para PostgreSQL:
yum -y install unixODBC unixODBC-devel postgresql-odbc

vi /etc/odbc.ini
[zabbix]
Description = PostgreSQL Zabbix Database
Driver      = PostgreSQL
Server      = midatabasehost
User        = zabbix-server
Password    = zabbix-server
Port        = 5432
Database    = zabbix-server


Comprobar que podemos conectar con:
isql -v keyODBC

Para mssql:
isql -v CLAVE user password

db.odbc.select[<unique short description>,zabbix]
  "zabbix" sera el dsn que tiene que matchear con lo que pngamos en el odbc.ini entre corchetes

Nos permite lanzar queries a una bbdd SQL y meter el resultado como un item.

Podemos poner LLD (mirar lld.md)
