http://docs.ansible.com/ansible/latest/zabbix_host_module.html

Otros módulos no oficiales:
https://github.com/openshift/openshift-tools/commits/prod/ansible/roles/lib_zabbix/library

Hace falta tener instalado en la maquina donde se lance la task:
pip install zabbix-api

Se usa con:
import zabbix_api

Seguramente queramos:
sudo pip install zabbix-api

No vale un venv de python porque el .py que se genera para ejecutarse correrá con el python del sistema.


# zabbix_host
https://github.com/ansible/ansible/blob/devel/lib/ansible/modules/monitoring/zabbix/zabbix_host.py#L786
Si le ponemos force:no, añadirá interfaces, templates y host_groups


# Templates
ansible localhost -m zabbix_template -a "server_url=http://zabbix login_user=Admin login_password=zabbix template_name='Template Telegraf XXXX' state=dump" | sed "s/localhost | SUCCESS => //" | jq '.template_json' > zbx_export_templates_telegraf_XXXX.json

bajarnos un template en formato json


Pequeño playbook para subir un template json:
- hosts: localhost
  gather_facts: false
  tasks:
    - name: Import templates on zabbix
      local_action:
        module: zabbix_template
        server_url: "http://zabbix"
        login_user: "Admin"
        login_password: "zabbix"
        template_name: "Template Telegraf JBoss JMX"
        template_json: "{{ lookup('file', 'zbx_export_templates_telegraf_jboss_jmx.json') }}"
        template_groups: "Templates"
        timeout: 30
