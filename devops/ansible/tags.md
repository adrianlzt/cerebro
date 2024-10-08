<https://docs.ansible.com/ansible/2.6/user_guide/playbooks_tags.html>

A las tasks podemos ponerles tags, de manera que podemos ejecutar solo ciertas tasks de un playbook:

tasks:

- name: template apache config
    template: src=httpd.conf.j2 dest=/etc/httpd/conf/httpd.conf
    tags:
  - templates
  - apache
    notify:
  - restart apache

- name: template the file /etc/motd
    template: src=motd.j2 dest=/etc/motd owner=root group=wheel mode=0644
    tags:
  - motd

- include: foo.yml tags=web,foo

/usr/bin/ansible-playbooks /etc/ansible/playbooks/site.yml --tags=motd

roles:

- { role: webserver, port: 5000, tags: [ 'web', 'foo' ] }

tags: always
  siempre se ejecuta

tags: never
  nunca se ejecuta
  podemos jugar a poner never y otras tags, para luego solo ejecutar ciertas tags, pero que por defecto no se ejecuten

--tags tagged/untagged/all
  solo se ejecutan las tareas tagged, sin tags o todo

# Ansible 2.0

No meter tags dentro de un fichero que hacemos include, funcionará peor por la carga dinámica de tags.
<https://www.ansible.com/blog/ansible-2.0-launch>

Ansible no protestará si especificamos una tag que no existe con --tags o --skip-tags

# include_tasks

Aplicar tags a una task y a las tasks que importa.

```
- name: Carga de variables
  ansible.builtin.include_tasks:
    file: tasks/load_vars.yml
    apply:
      tags: [always]
  tags:
    - always
```
