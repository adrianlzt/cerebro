# Filtrar
Podemos elegir únicamente que queremos desplegar:

Ejemplos:

terraform plan -target='module.zabbix_web.openstack_compute_instance_v2.instance["zabbix_web01"]' .

terraform plan --target=module.zabbix_server --target=module.zabbix_db --target=module.zabbix_web .
