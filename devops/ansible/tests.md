# Desarrollo de Ansible
https://docs.ansible.com/ansible/devel/dev_guide/testing_units.html
Lanzar los unit tests


## Tests de integracion
https://docs.ansible.com/ansible/devel/dev_guide/testing_integration.html#testing-integration
Correr los tests de integración del módulo zabbix_host usando una imagen de ubuntu:
source hacking/env-setup
ansible-test integration -v zabbix_host --docker ubuntu1804


# Probar nuestros roles/plays
mirar molecule.md


https://servercheck.in/blog/testing-ansible-roles-travis-ci-github

There are four main things I make sure I test when building and maintaining an Ansible role:

The role's syntax (are all the .yml files formatted correctly?).
Whether the role will run through all the included tasks without failing.
The role's idempotence (if run again, the role should not make any changes!).
The role's success (does the role do what it should be doing?).


http://leucos.github.io/2015/03/14/testing-ansible-roles-part-1/
Con rolespec. Pensado para Ubuntu. No se que tal para centos
