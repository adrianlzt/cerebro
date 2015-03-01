http://www.ansible.com/how-ansible-works
http://docs.ansible.com/playbooks_delegation.html

En un play podemos definir cuantas hebras trabajarán simultáneamente:
serial: 5

También se puede hacer por parámetro: -f 5

Ansible >= 1.8
Se puede pasar como un porcentaje
- name: test play
  hosts: websevers
  serial: "30%"


Si ponemos serial: 1, se ejecutarán todas las task en el primer servidor, y si no ha habido ningún fallo, se pasará al siguiente.
