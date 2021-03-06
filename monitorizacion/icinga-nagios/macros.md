Variables que podemos usar en los ficheros de configuración definidas por Icinga:

http://docs.icinga.org/latest/en/macrolist.html

Ejemplo:
service_template.cfg
define service{
        name                            generic-service
        active_checks_enabled           1
...
        register                        0
        notes_url                       http://web/wiki/index.php/Monitoring-$HOSTNAME$.$SERVICEDESC$
}


## Custom macros
http://docs.icinga.org/latest/en/macros.html#customvar

Se definen poniendo _nombre y se usan (en mayusculas!):
  Si son de host: $_HOSTNOMBRE$
  Si son de service: $_SERVICENOMBRE$
  Si son de contact: $_CONTACTNOMBRE$
test.cfg
define host {
    ...
    _nombre                        pepito
    notes_url                      http://server.com/query?$_HOSTPRUEBA$
}

Poner todo en mayusculas!

## Livestatus
Livestatus tiene su propia implementación de la expansión de macros:
https://mathias-kettner.de/checkmk_livestatus.html#H1:Expansion%20of%20macros

Código donde se implementa (sería fácil extenderlo a más macros, parece):
http://git.mathias-kettner.de/git/?p=check_mk.git;a=blob;f=livestatus/src/OffsetStringMacroColumn.cc;h=1014b048ddb78499889fbfa01b0d0010cad9e233;hb=HEAD#l83

Solo soportan unas pocas:
for hosts and services: HOSTNAME, HOSTDISPLAYNAME, HOSTALIAS, HOSTADDRESS, HOSTOUTPUT, LONGHOSTOUTPUT, HOSTPERFDATA, HOSTCHECKCOMMAND
for services: SERVICEDESC, SERVICEDISPLAYNAME, SERVICEOUTPUT, LONGSERVICEOUTPUT, SERVICEPERFDATA, SERVICECHECKCOMMAND
all custom macros on hosts and services (beginning with _HOST or _SERVICE)
all $USER...$ macros


# Environment variables
Si queremos hacer un dump:
https://wiki.icinga.org/display/testing/Icinga+Plugin+Testing
define command {
    command_name        3322check_env
    command_line        /usr/bin/env >> /tmp/3322_icinga.$TIMET$.env
}

service_notification_commands  notify-service-by-email,3322check_env



# Internals
https://github.com/Icinga/icinga-core/blob/52d20dce2e95a5d94fd340bafc2f0926a7efe945/common/macros.c#L127
Función que parsea una string y cambia las macros por valores.

https://github.com/Icinga/icinga-core/blob/52d20dce2e95a5d94fd340bafc2f0926a7efe945/common/macros.c#L199
Aqui es donde se resuelve la variable al valor

https://github.com/Icinga/icinga-core/blob/52d20dce2e95a5d94fd340bafc2f0926a7efe945/common/macros.c#L596
Aqui busca la mayoría de las macros (alguns especiales las chequea antes o despues)

https://github.com/Icinga/icinga-core/blob/52d20dce2e95a5d94fd340bafc2f0926a7efe945/common/macros.c#L710
Obtiene las macros de contacto
En mac estan las macros disponibles


Si queremos debugear un modulo neb, parar aqui https://github.com/Icinga/icinga-core/blob/d3158e0140b19bc578556d0172a5ec69c943d4d1/base/nebmods.c#L273

b nebmods.c:273

Ejemplo para el neb module de mod_gearman
b neb_module_nagios3/../neb_module/mod_gearman.c:575
breakpoint en handle_notifications
