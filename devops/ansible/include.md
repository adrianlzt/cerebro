Ansible 2.4:
Using import_* (import_playbook, import_tasks, import_role) directives are static.
Using include_* (include_tasks, include_role) directives are dynamic. This is done to avoid collisions and possible security issues as facts come from the remote targets and they might be compromised.


Se puede usar includes al igual que en puppet:

Ejemplo de main.yaml

---
- include: kibana.yml wp_user=pepe

- include: nginx.yml
  tags:
   - nginx

- include: tasks/sometasks.yml
  when: "'reticulating splines' in output"

- include: wordpress.yml
  vars:
      wp_user: timmy
      ssh_keys:
        - keys/one.txt
        - keys/two.txt

- name: "nombre para el include"
  include: "{{var}}/fichero.yml"


También se puede crear un playbook que haga includes a otros playbooks:
all.yml:
- include: 1play.yml
- include: 2play.yml

1play.yml:
- hosts: 127.0.0.1
  connection: local
  tasks:
    - debug: msg='play 1'

2play.yml:
- hosts: 127.0.0.1
  connection: local
  tasks:
    - debug: msg='play 2'


No se puede hacer include con with_items



# static
Define si los includes deben ser dinámicos o estáticos.
Se intenta autodetectar.
Se puede forzar:
static: no
