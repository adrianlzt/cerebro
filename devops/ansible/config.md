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

