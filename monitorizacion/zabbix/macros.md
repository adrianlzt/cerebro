https://www.zabbix.com/documentation/3.4/manual/config/macros

Hay macros ha varios niveles: instalación, template, host, etc

{EJEMPLO}


User macro:
{$FOO}



# Macros con context
macros:
{$LOW_SPACE_LIMIT} 10
{$LOW_SPACE_LIMIT:”/opt”} 25

trigger:
{ca_001:vfs.fs.size[{#FSNAME},pfree].last()} < {$LOW_SPACE_LIMIT:{#FSNAME}}

Para el sistema de fichero /opt el trigger saltará al 25%
Para el resto, 10%
