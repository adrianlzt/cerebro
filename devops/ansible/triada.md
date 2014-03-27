tasks:
  # Package
  - name: install foo package
    yum: name=foo state=latest
  
  # Config
  - name: template apache config
    template: src=httpd.conf.j2 dest=/etc/httpd/conf/httpd.conf
    notify:
      - restart apache
  
  # Service
  - name: enable foo service
    service: name=foo enabled=yes
  
  - name: start foo service
    service: name=foo state=started

handlers:
  - name: restart apache
    service: name=httpd state=restarted
