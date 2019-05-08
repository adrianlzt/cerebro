Si tenemos que cargar los sql, el orden es:
schema
images
data


# Postgres
Si queremos conectar a un activo-pasivo podemos pasarlo en la cadena de conex, para reconectar cuando el activo caiga:

DBHost=
DBName=postgresql://postgres@192.168.32.4,192.168.32.3/zabbix?target_session_attrs=read-write



# Web
La config se realiza en /etc/zabbix/web/zabbix.conf.php
