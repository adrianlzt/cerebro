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
