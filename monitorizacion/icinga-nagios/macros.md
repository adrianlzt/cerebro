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

Se definen poniendo _nombre y se usan:
  Si son de host: $_HOSTnombre$
  Si son de service: $_SERVICEnombre$
  Si son de contact: $_CONTACTnombre$
test.cfg
define host {
    ...
    _prueba                        pepito
    notes_url                      http://server.com/query?$_HOSTprueba$
}

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
