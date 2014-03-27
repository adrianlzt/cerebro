Generar fichero con contenido:

- name: gen file
  file: dest=/tmp/fichero content="cosas"

- name: gen file
  lineinfile: dest=/tmp/ansible1/ficheroLine line="prueba contenido" create=yes



Borrar fichero
- name: delete custom fact for hostgroups if not defined
  file: dest="{{ facter_dir }}/hostgroup.json" backup=yes state=absent
  when: hostgroup != ""



Si hay definida una variable aplicamos un template, si no, nos aseguramos de que el fichero no exista:
- name: set custom fact for hostgroups if defined
  template: src=hostgroup.json.j2 dest="{{ facter_dir }}/hostgroup.json" backup=yes
  when: hostgroup is defined

- name: delete custom fact for hostgroups if not defined
  file: dest="{{ facter_dir }}/hostgroup.json" backup=yes state=absent
  when: hostgroup is not defined

