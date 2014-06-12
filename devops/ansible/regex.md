- name: copiar a fichero
  shell: chdir=/home/adrian/Documentos/vagrant/puppet-monitoring/ui ./crear-release 1.2.341
  register: fichero

- name: sacar rpm del output
  shell: echo "{{fichero.stdout_lines[2]}}" | sed 's@^.*:path=>\(.*rpm\)}$@\1@'
  register: var_buena

- debug: msg="{{var_buena.stdout}}"
