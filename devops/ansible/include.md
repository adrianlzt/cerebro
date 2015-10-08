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
