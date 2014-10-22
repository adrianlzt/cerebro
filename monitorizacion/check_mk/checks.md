Ayuda para los distintos checks:

Todos los checks disponibles:
/usr/share/check_mk/checks
cmk -L

Ayuda específica para el check "if".
cmk -M if

Cada check tiene sus propias variables. Muy bien documentado. Estas variables se pueden definir en el main.mk o en los .mk de cada grupo.



# Estructura del check
1.- Hace un scan contra el host. En este caso da True si encuentra alguno de los oid definidos
2.- Si el scan es True, ejecuta la funcion de inventario (inventory_dsmc_cisco_cpu). A esta función se le pasa el parámetro info, cuyos valores viene definidos por snmp_info. En este caso es un snmpwalk .1.3.6.1.4.1.9.9.109.1.1.1.1 (.2, .5 y .8)
3.- La función check_dsmc_cisco_cpu mete en el inventario el check que debe ejecutar con los parámetros que definamos.

check_info["dsmc_cisco_cpu"] = {
    "check_function"        : check_dsmc_cisco_cpu,
    "inventory_function"    : inventory_dsmc_cisco_cpu,
    "service_description"   : "CPU utilization %s",
    "has_perfdata"          : True,
    "group"                 : "cpu_utilization",
    "snmp_scan_function"    : lambda oid: oid(".1.3.6.1.4.1.9.9.109.1.1.1.1.8.1") == None \
                                  and oid(".1.3.6.1.4.1.9.9.109.1.1.1.1.5.1") == None,
    "snmp_info"             : ( ".1.3.6.1.4.1.9.9.109.1.1.1.1", [ 2, 5, 8 ]),
}

