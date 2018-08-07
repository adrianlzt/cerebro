http://docs.ansible.com/ansible/latest/zabbix_host_module.html

Hace falta tener instalado en la maquina donde se lance la task:
pip install zabbix-api

Seguramente queramos:
sudo pip install zabbix-api

No vale un venv de python porque el .py que se genera para ejecutarse correrá con el python del sistema.


# zabbix_host
https://github.com/ansible/ansible/blob/devel/lib/ansible/modules/monitoring/zabbix/zabbix_host.py#L786
Si le ponemos force:no, añadirá interfaces, templates y host_groups


# Templates
ansible localhost -m zabbix_template -a "server_url=http://zabbix login_user=Admin login_password=zabbix template_name='Template Telegraf XXXX' state=dump" | sed "s/localhost | SUCCESS => //" | jq '.template_json' > zbx_export_templates_telegraf_XXXX.json

bajarnos un template en formato json
