https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/odbc_checks

Hace falta tener instalado y configurado ODBC
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


db.odbc.select[<unique short description>,<dsn>]

Nos permite lanzar queries a una bbdd SQL y meter el resultado como un item.

Podemos poner LLD (mirar lld.md)
