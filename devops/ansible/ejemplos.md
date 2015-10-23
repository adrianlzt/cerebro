https://github.com/ansible/ansible-examples

https://galaxy.ansible.com/
Este es como el puppet forge


Instalar un galaxy:
ansible-galaxy install angstwad.docker_ubuntu

Lo instalará en .ansible/roles/


Para usarlo creamos un playbook diciendo donde instalar este role:

- hosts: hostdondeaplicar
  roles:
     - { role: valentinogagliardi.sysdig }


Update roles:
https://github.com/ansible/ansible/issues/6466
