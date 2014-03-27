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

/usr/bin/ansible-playbooks /etc/ansible/playbooks/site.yml --tags=motd

