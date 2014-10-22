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

