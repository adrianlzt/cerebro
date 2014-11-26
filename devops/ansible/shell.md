- name: echo prueba 
  shell: echo 'still busy'


- name: guarda el ultimo tag
  shell: /usr/bin/git tag -l | sort -g | tail -1 chdir=/tmp/puppet-monitoring-ui/dev
  register: last_tag


# Ejecuta como usuario cyclops
- name: insert localhost as known host for ssh
  shell: /usr/bin/ssh-keyscan -H localhost > /home/cyclops/.ssh/known_hosts
  sudo: yes
  sudo_user: 'cyclops'
  args:
    creates: /home/cyclops/.ssh/known_hosts

