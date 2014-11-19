http://docs.ansible.com/playbooks_loops.html

No se puede usar {{item}} en el name

- name: install packages loop
   yum: name={{ item }} state=present
   with_items:
     - vim-enhanced
     - screen
     - nano
     - mlocate


- name: add several users
  user: name={{ item.name }} state=present groups={{ item.groups }}
  with_items:
    - { name: 'testuser1', groups: 'wheel' }
    - { name: 'testuser2', groups: 'root' }

# copy each file over that matches the given pattern
- copy: src={{ item }} dest=/etc/fooapp/ owner=root mode=600
  with_fileglob:
    - /playbooks/files/fooapp/*

- action: shell /usr/bin/foo
  register: result
  until: result.stdout.find("all systems go") != -1
  retries: 5
  delay: 10


## Ejecutar un comando sobre las lineas de stdout de otro comando
- name: Example of looping over a REMOTE command result
  shell: /usr/bin/something
  register: command_result

- name: Do something with each result
  shell: /usr/bin/something_else --param {{ item }}
  with_items: command_result.stdout_lines



- name: indexed loop demo
  debug: msg="at array position {{ item.0 }} there is a value {{ item.1 }}"
  with_indexed_items: some_list




- name: obtain the lists of HDs
  shell: /usr/sbin/smartctl --scan | cut -d ' ' -f 1
  register: hds

- name: set nrpe SMART commands
  template: src=/tmp/ansible/smart.cfg.j2
            dest=/tmp/ansible/nrpe/

{% for disk in hds.stdout_lines %}
command[smart{{ disk.replace('/','_') }}]=/usr/lib64/nagios/plugins/check_smart -d {{ disk }}} -i scsi
{% endfor %}

