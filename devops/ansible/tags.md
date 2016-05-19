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


# Ansible 2.0
No meter tags dentro de un fichero que hacemos include, funcionará peor por la carga dinámica de tags.
https://www.ansible.com/blog/ansible-2.0-launch

Ansible no protestará si especificamos una tag que no existe con --tags o --skip-tags

