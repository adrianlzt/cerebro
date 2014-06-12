- name: echo prueba 
  shell: echo 'still busy'


- name: guarda el ultimo tag
  shell: /usr/bin/git tag -l | sort -g | tail -1 chdir=/tmp/puppet-monitoring-ui/dev
  register: last_tag
