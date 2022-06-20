Cuando te ves repitiendo en tu rol exactamente las mismas variables que vas a pasar al módulo, por ejemplo, un rol "provisioner" que crea usuarios a partir de una lista.

En vez de tener que declarar el módulo con todas las variables de tu diccionario e ir pasándolas una a una al módulo, se puede pasar directamente un diccionario.



https://docs.ansible.com/ansible/devel/reference_appendices/faq.html#argsplat-unsafe

```
vars:
  usermod_args:
    name: testuser
    state: present
    update_password: always
tasks:
- user: '{{ usermod_args }}'
```

O con una lista (https://serverfault.com/questions/824531/can-i-use-a-dictionary-variable-to-supply-all-task-parameters):
```
- hosts: localhost
  gather_facts: no
  vars:
    args_list:
      - content: hello world
        dest: /tmp/test1.txt
        mode: 0666
      - content: test test test
        dest: /tmp/test2.txt
        mode: 0444
  tasks:
    - copy:
      args: "{{ item }}"
      with_items: "{{ args_list }}"
```

Ejemplo inyectando variables para no tener que repetirlas:
```
- name: Create users
  community.grafana.grafana_user: "{{item | combine({
    'url': grafana_provisioner__url,
    'url_username': grafana_provisioner__admin_username,
    'url_password': grafana_provisioner__admin_password
    }) }}"
  with_items: "{{grafana_provisioner__users}}"```


Cuidado con que alguien malicisoso pueda setear una host_var en un host target y modificar la ejecución.
 - set bulk variables at a level of precedence greater than host facts in the order of precedence found in Variable precedence: Where should I put a variable? (the example above is safe because play vars take precedence over facts)

 - disable the INJECT_FACTS_AS_VARS configuration setting to prevent fact values from colliding with variables (this will also disable the original warning)
