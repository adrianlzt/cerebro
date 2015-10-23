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
