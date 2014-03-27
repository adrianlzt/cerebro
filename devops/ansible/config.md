http://docs.ansible.com/intro_configuration.html

Por defecto la configuración se enuentra en /etc/ansible


Crearemos un ~/.ansible.cfg con:
[defaults]
hostfile       = ~/.ansible/hosts
roles_path    = ~/.ansible/roles


Y así podremos gestionar nuestros hosts y playbooks con el usuario normal del sistema.

Los playbooks los podemos meter, por ejemplo, en .ansible/playbooks/

