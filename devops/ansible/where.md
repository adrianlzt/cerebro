Si queremos que una tarea se ejecute dependiendo del resultado de otra:

- name: set custom fact to define if we have monitoring
  tags:
    - conf
  template: src=monitoring.json.j2 dest="{{ facter_dir }}/monitoring.json" backup=yes
  register: result


- name: move nrpe.d to nrpe.manual
  tags:
    - conf
  command: cp -pr /etc/nrpe.d/ /etc/nrpe.backup/ creates=/etc/nrpe.backup
  when: result.changed == True


Cuando usamos ansible-playbook con --check --diff el resultado de la tarea condicionada siempre estará como skipping. Solo cuando lo ejecutemos de verdad cogerá el valor adecuado.
