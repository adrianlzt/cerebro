http://docs.ansible.com/ansible/latest/zabbix_host_module.html

Hace falta tener instalado en la maquina donde se lance la task:
pip install zabbix-api

No vale un venv de python porque el .py que se genera para ejecutarse correrá con el python del sistema.


# Templates
ansible localhost -m zabbix_template -a "server_url=http://zabbix login_user=K5290872 login_password=Cuatro44 template_name='Template Telegraf XXXX' state=dump" 

bajarnos un template en formato json
hay que quitar algunas lineas que mete ansible
