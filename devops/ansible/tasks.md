tasks:
  - name: set puppet config file
    template: src=puppet.conf.j2 dest=/tmp/ansible/puppet.conf

  - name: placeholder foo
    tags:
      - motd
    command: /bin/foo

  - name: be sure libselinux-python are installed
    yum: >
      name=libselinux-python
      state=present

  - include: tasks/pepe.yml

  - include: wordpress.yml user=timmy

  - { include: wordpress.yml, user: timmy, ssh_keys: [ 'keys/one.txt', 'keys/two.txt' ] }

- include: wordpress.yml
    vars:
        remote_user: timmy
        some_list_variable:
          - alpha
          - beta
          - gamma


# run once
Ejecutar solo una vez una tarea (one time and one host)

- command: /opt/application/upgrade_db.py
  run_once: true


When “run_once” is not used with “delegate_to” it will execute on the first host, as defined by inventory, in the group(s) of hosts targeted by the play. e.g. webservers[0] if the play targeted “hosts: webservers”.

Parece que lo ejecuta siempre en el primer host del grupo "all"
No se puede poner con un include: blabla.yml
