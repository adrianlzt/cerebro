http://mathias-kettner.com/checkmk_configvars.html

Check_mk lee todos los ficheros .mk de /etc/check_mk/conf.d/
Siempre hay que ir haciendo append para all_hosts para no cargarse la lista.

El fichero principal es /etc/check_mk/main.mk, luego se leera el conf.d/

Creas un fichero por cada tipo de elemento:
/etc/check_mk/conf.d/NOMBRE.mk

all_hosts += [
                'NOMBREMAQUINA|ETIQUETA1|ETIQUETA2|snmp',
                'mon-LB01|network|snmp|ace',
                'mon-LB02|network|snmp|ace',
                'mon-LB01|network|snmp|ace',
]

# Si el nombre de la máquina no resuelve tendremos que definirlo en este diccionario.
ipaddresses ['mon-LB01'] = '100.6.2.117'
ipaddresses ['mon-LB02'] = '100.6.2.118'
ipaddresses ['mon-LB01'] = '100.6.2.119'


# Hacer inventario
cmk -I
Genera unos ficheros temporales internos de check_mk con los descubrimientos que haya hecho (/var/lib/check_mk/autochecks)

cmk -II
Como el anterior, pero borrar todo lo que había y rehace el redescubirmiento

cmk -U
Genera los ficheros de configuración de Icinga (services, servicegroups, commands, etc) y los checks.
Los checks son ficheros python, uno por máquina, donde están dentro los programitas que comprobarán cada uno de los parámetros que se hayan detectado.
/var/lib/check_mk/precompiled
Estos comandos son los que ejecuta directamente Icinga. El chequeo activo se vuelve con el valor resumen de todo, y mediante checks pasivos se alimenta a todos los services configurados de cada máquina.
En el caso de usar gearman hará un send_gearman, si no lo metera en el directorio check_results.
Si queremos ver a mano como está funcionando:
python -v nombre.py


# Checks genéricos que dará por defecto
- Check activo que ejecuta el python
- Checks de estado de las interfaces
- Check de uptime


## Configuración general main.mk ##

generate_hostconf = False
# Si esta a false no generara el "nagios host {" para cada elemento.

snmp_default_community = "PASSWORD"

snmp_communities = [
        ( "comunidad", ["network"], ALL_HOSTS ),
]
# Aplicar community "comunidad" a todos los hosts (ALL_HOSTS, podria ser una lista de hosts), que tengan la etiqueta "network".

checkgroup_parameters['if'] = [
  ( {'unit': 'bit'}, [], ALL_HOSTS, ALL_SERVICES, {'comment': u'Show bits instead of bytes'} )
]
# Sacar las unidades de intefaz en bits en vez de bytes

if_inventory_porttypes = [ '6',  '32', '117', '53', '131', '135', '136', '137' ]

#if_inventory_portstates = ['1', '2', '5']
# Por defecto solo descubre interfaces UP
# Descubrir interfaces UP (1), DOWN (2) y DORMANT (5)
# Check_mk almacena el estado de la appliance (hablando del check de interfaces, if o if64) y salta un CRITICAL ante un cambio.
# Un cambio puede ser que una interfaz pasa de DOWN (cuando se escaneó) a UP.

bulkwalk_hosts = [
#  ( NEGATE, [ "snmp_01", "snmp_02" ] ),
  ( ["network"], ALL_HOSTS )
]
# Bulkwalk pide bloques de varias variables de golpe (en vez de snmpwalk que va uno a uno).
# snmpwalk solo puede coger valores hasta 32bits, snmpbulkwalk supera esta limitación.
# usar siempre que se pueda snmpbulkwalk. Solo para snmp > 2.0. Algunos equipos no lo soportan aunque tengan snmp > 2.0

service_groups = [
  ( "check-mk_name", ALL_HOSTS, ALL_SERVICES ),
]
# Meter a todos los checks generados por check_mk en el service group "check-mk_name"

ignored_checks += [
  ( "icmp", [ ALL_HOSTS ]),
]
# Check_mk mete un service check_ping a todas las máquinas. Es redundante con el check_ping que se hace ya a los hosts
# Si al hacer un inventario de un host no descubre nada, siempre meterá el check de ping, aunque lo tengamos ignorado en este parámetro.

ignored_checktypes = [ "icmp" , "cisco_temp_sensor", "cisco_hsrp"]
# no usar estos checks aunque se descubran en los appliance

extra_service_conf["notes_url"] = [
   ("http://wikis.com/index.php/$HOSTNAME$.$SERVICECHECKCOMMAND$",ALL_HOSTS,ALL_SERVICES)
]

extra_service_conf["check_interval"] = [
   ( "2",["network"],ALL_HOSTS,ALL_SERVICES),
]

