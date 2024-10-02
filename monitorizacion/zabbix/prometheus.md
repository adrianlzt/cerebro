<https://www.zabbix.com/documentation/current/en/manual/config/items/itemtypes/prometheus>

Zabbix puede hacer una llamada HTTP para obtener métricas con el formato de Prometheus.
Luego se pueden generar dependent items para obtener valores específicos de las métricas, usando preprocessing con Prometheus patterns.

También se pueden crear LLD rules.

# Generar templates

<https://github.com/zabbix-tooling/prometheus_zabbix_template_generator>

Script para generar una template de Zabbix a partir de unas métricas de Prometheus.

## Install

```bash
# git clone https://github.com/zabbix-tooling/prometheus_zabbix_template_generator.git
# Usar esta versión con arreglos:
git clone https://github.com/szelga/prometheus_zabbix_template_generator.git
cd prometheus_zabbix_template_generator
source .venv/bin/activate
uv pip install -e .
```

## Uso

```bash
python prom2zabbix.py --template foo.json --dump metrics.txt --name foo
```
