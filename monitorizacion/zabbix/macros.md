https://www.zabbix.com/documentation/6.0/manual/config/macros

Hay macros ha varios niveles: instalación, template, host, etc

{EJEMPLO}


User macro:
{$FOO}



# Macros con context
macros:
{$LOW_SPACE_LIMIT} 10
{$LOW_SPACE_LIMIT:"/opt"} 25

trigger:
{ca_001:vfs.fs.size[{#FSNAME},pfree].last()} < {$LOW_SPACE_LIMIT:{#FSNAME}}

Para el sistema de fichero /opt el trigger saltará al 25%
Para el resto, 10%


# Internal
Internamente las macros lanzan una query a la bbdd para resolverlas.
Parece una mejor idea evitar las macros en los triggers names, para evitar lanzar tantas queries contra la bbdd.
Esto al menos sucede con la macro {HOST.NAME} cuando los timer están chequeando un evento contra los actions, cuando hay una condition con el nombre del trigger.
