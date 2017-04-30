# CLI
cli_director.md
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/60-CLI.md

Podemos usar icingacli para generar hosts, services, etc


icingacli director <type> <action>

Type sera uno de:
command
endpoint
host
hostgroup
notification
service
timeperiod
user
usergroup
zone

Action:
create  Create a new object
delete  Delete a specific object
exists  Whether a specific object exists
set     Modify an existing objects properties
show    Show a specific object



# Listar hosts (y templates de host)
icingacli director hosts list

# Mostrar un host
No funciona, bug.
En la interfaz web del director, en Preview, podemos ver los parametros que podemos querer definir.

# Crear un host
icingacli director host create NOMBRE --imports "Linux Server Client" --address 10.0..2 --display_name="NOMBRE BONITO" --vars.role="app"
  el valor de "vars.role" sera la key, no el nombre bonito

# Modificar parametros de un host
icingacli director host set app5 --vars.role app
