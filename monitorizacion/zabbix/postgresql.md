# Monitorizar un postgres con zabbix-agent
https://github.com/cavaliercoder/libzbxpgsql

This project provides comprehensive monitoring of PostgreSQL servers using a natively compiled Zabbix agent module, written in C.

A preconfigured Zabbix Template is also included for your convenience.


# Particionado de la postgres (viejo, postgres 9.6, usar native partitioning)
https://github.com/cavaliercoder/zabbix-pgsql-partitioning
Debate general en instalacion.md


En instalaciones granges se hacen particiones de tablas y se deshabilita el housekeeper (mirar instalacion.md). Lo que se hace es ir borrando las particiones antiguas.
https://github.com/Doctorbal/zabbix-postgres-partitioning
  no veo muy útil el pg_partman si usamos postgres 11



# Conexiones de zabbix a postgres
Cada proceso de estos tipos conecta directamente a la bd:
 - alerter
 - configuration syncer
 - dicoverer
 - escalator
 - history syncer
 - http poller
 - ipmi poller
 - poller
 - proxy poller
 - snmp trapper
 - task manager
 - timer
 - trapper
 - unreachable poller
 - db watchdog (creo que sin conex permanente)

Los que no conectan, o no de manera permanente:
 - housekeeper
 - icmp pinger
 - self-monitoring
 - vmware collector
