https://docs.microsoft.com/es-es/sql/ssms/scripting/sqlcmd-use-the-utility?view=sql-server-2017

docker run -it mcr.microsoft.com/mssql-tools /opt/mssql-tools/bin/sqlcmd


/opt/mssql-tools/bin/sqlcmd -S nombreServer,puerto -P contraseña -U usuario -Q "select 1"
