http://docs.ansible.com/playbooks_conditionals.html

- name: template the file /foo.txt
  template: src=foo.j2 dest=/foo.txt owner=root group=wheel mode=0644
  when: ansible_hostname == "foo.example.com"



tasks/main.yml:
- name: set custom facts for interface
  template: src=interface.json.j2 dest=/tmp/ansible/interface.json backup=yes
  when: interface is defined

Tambien tenemos el "VARIABLE is not defiend"


Ejecutar tareas dependiendo de el valor del último task:
tasks:
  - command: /bin/false
    register: result
    ignore_errors: True
  - command: /bin/something
    when: result|failed
  - command: /bin/something_else
    when: result|success
  - command: /bin/still/something_else
    when: result|skipped

Variable definida o no definida:
when: var
when: not var

Contenido de la salida:
when: "'reticulating splines' in output"


Hace una tarea u otra dependiendo si fileinline modifica o no un fichero:
    - name: gen file
      lineinfile: dest=/tmp/ansible1/ficheroLine line="prueba contenido" create=yes
      register: result

    - debug: msg="Fichero cambiado"
      when: result.changed == True

    - debug: msg="Sin cambios"
      when: result.changed == False
