## Filtros ##

Operadores: =, !=, <, <=, >, >=, contains, and, or, not, (, )

Campos válidos para evt.type: sysdig -l
Campos válidos para evt.arg: sysdig -L

"not fd.name contains /dev"
"fd.name contains /root"
"user.name=loris"
fd.type=ipv4 and \( proc.name=curl or proc.name=nc \)
fd.cip=127.0.0.1
