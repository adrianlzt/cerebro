https://docs.ansible.com/ansible/latest/dev_guide/developing_collections.html
Un package de plugins, roles y modules.

Se pueden instalar con ansible-galaxy
ansible-galaxy collection install <namespace.collection>

Estructura de una collection: https://github.com/bcoca/collection

Podemos inicializar una collection con:
ansible-galaxy collection init <namespace>.<collection>

En galaxy.yml podemos poner otras collections de las que depende esta collection.
Formato del fichero: https://docs.ansible.com/ansible/latest/dev_guide/collections_galaxy_meta.html#collections-galaxy-meta


# Movimiendo modules version 2.10
Los modules community se mueven del repo oficial a subrepos:
https://github.com/ansible-collections/overview


Collections, aunque pueden estar en otros servers y orgs que no sean github/ansible.collections:
https://github.com/ansible-collections/

La mayoría de los módulos, que no son core, irán aquí:
https://github.com/ansible-collections/community.general

Zabbix separado:
https://github.com/ansible-collections/community.zabbix

También windows separado:
https://github.com/ansible-collections/community.windows
