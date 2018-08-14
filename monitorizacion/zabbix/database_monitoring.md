https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/odbc_checks

Hace falta tener instalado y configurado ODBC

Para MySQL mirar la doc de Zabbix

Para PostgreSQL:
yum -y install unixODBC unixODBC-devel postgresql-odbc

vi /etc/odbc.ini
[zabbix]
Description = PostgreSQL Zabbix Database
Driver      = PostgreSQL
Servername  = midatabasehost
Username    = zabbix-server
Password    = zabbix-server
Port        = 5432
Database    = zabbix-server


db.odbc.select[<unique short description>,zabbix]
  "zabbix" sera el dsn que tiene que matchear con lo que pngamos en el odbc.ini entre corchetes

Nos permite lanzar queries a una bbdd SQL y meter el resultado como un item.

Podemos poner LLD (mirar lld.md)
