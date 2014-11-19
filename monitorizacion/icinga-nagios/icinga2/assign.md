http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/configuring-icinga2#apply

assign where host.vars.mssql_port
  asignar si la variable esta seteada

assign where host.vars.os == "Linux"
ignore where host.vars.os == "Windows"

assign where host.vars.nginx || host.vars.apache
  no probado
Tambien podemos poner dos lineas, es equivalente:
  assign where host.vars.nginx
  assign where host.vars.apache

assign where match("nrpe-*", host.name)

assign where match("ping*", service.name)
assign where match("http_*", service.check_command)
assign where service.check_command == "disk"

Asignar a todos
assign where true


Funciones:
http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/configuring-icinga2#function-calls
regex(pattern, text)
match(pattern, text)
len(value)
union(array, array, ...)
...
