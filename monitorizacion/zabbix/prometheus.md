<https://www.zabbix.com/documentation/current/en/manual/config/items/itemtypes/prometheus>

Zabbix puede hacer una llamada HTTP para obtener métricas con el formato de Prometheus.
Luego se pueden generar dependent items para obtener valores específicos de las métricas, usando preprocessing con Prometheus patterns.

También se pueden crear LLD rules.

# Generar templates

Script para generar una template de Zabbix a partir de unas métricas de Prometheus.

<https://github.com/k1nky/prometheus2zabbix>

Este funciona peor: <https://github.com/zabbix-tooling/prometheus_zabbix_template_generator>
