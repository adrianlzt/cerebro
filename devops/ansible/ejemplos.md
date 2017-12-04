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


Para poder usar galaxy el rol debe tener un meta/main.yml al menos con:
---
galaxy_info:
  author: BBB
  description: Manage yum repositories
  company: AAA
  platforms:
    - name: RedHat
      versions:
        - 7
dependencies: []



# Fichero de roles
requirements.yml:
- src: user.role
- src: git+https://git.com/user/name.git

ansible-galaxy install -p roles -r requirements.yml
