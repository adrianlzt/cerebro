https://docs.ansible.com/ansible/latest/dev_guide/developing_collections.html
https://docs.ansible.com/ansible/latest/user_guide/collections_using.html#id1
Un package de plugins, roles y modules.

Se pueden instalar con ansible-galaxy
ansible-galaxy collection install <namespace.collection>
Ejemplo:
ansible-galaxy collection install community.zabbix

En el requirements.yml
collections:
  - name: community.zabbix
    version: v0.1.0
roles:
  - name: foobar
    version: 1.0.0

ansible-galaxy collection install -r requirements.yml
ansible-galaxy role install -r requirements.yml

Parece que si queremos servir collections de forma privada tenemos que desplegar un Galaxy
https://docs.ansible.com/ansible/latest/user_guide/collections_using.html#install-multiple-collections-with-a-requirements-file


Los directorios des las collections deberán estar organizados de la siguiente manera:
└── collections
    └── ansible_collections
        └── community
            └── zabbix



Llamar a los módulos con: community.zabbix.zabbix_host
O hacer un "preload" en el playbook para poder llamarla sin tener que pasar el FQDN:
  collections:
    - community.zabbix

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
