http://docs.ansible.com/intro_configuration.html

Por defecto la configuración se enuentra en /etc/ansible


Crearemos un ~/.ansible.cfg con:
[defaults]
hostfile       = ~/.ansible/hosts
roles_path    = ~/.ansible/roles
[ssh_connection]
ssh_args = -o ForwardAgent=yes -o UserKnownHostsFile=/dev/null -o BatchMode=yes -o StrictHostKeyChecking=no -F /home/adrian/.ssh/config


Y así podremos gestionar nuestros hosts y playbooks con el usuario normal del sistema.
Tambien ansible usará la conf de .ssh/config

Los playbooks los podemos meter, por ejemplo, en .ansible/playbooks/


# Hostfile
Parece que se pueden pasar varios ficheros en la variable hostfile separados por coma: https://github.com/ansible/ansible/blob/v1.8.0/lib/ansible/inventory/__init__.py#L71

Tambien puede ser un directorio: https://github.com/ansible/ansible/blob/v1.8.0/lib/ansible/inventory/__init__.py#L97

Aqui comprueba si el fichero es ejecutable: https://github.com/ansible/ansible/blob/v1.8.0/lib/ansible/inventory/__init__.py#L116
Si es ejecutable se trata por https://github.com/ansible/ansible/blob/devel/lib/ansible/inventory/script.py
