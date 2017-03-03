http://docs.ansible.com/playbooks_conditionals.html

- name: template the file /foo.txt
  template: src=foo.j2 dest=/foo.txt owner=root group=wheel mode=0644
  when: ansible_hostname == "foo.example.com"

Con el nombre del inventario:
  when: inventory_hostname == "controller"


tasks/main.yml:
- name: set custom facts for interface
  template: src=interface.json.j2 dest=/tmp/ansible/interface.json backup=yes
  when: interface is defined

Tambien tenemos el "VARIABLE is not defiend"

when: (ansible_distribution == "CentOS" and ansible_distribution_major_version == "6") or
      (ansible_distribution == "Debian" and ansible_distribution_major_version == "7")


{% if 'http://gogolg.es/asd' | match("http://.*") %}
es http
{% else %}
es otra cosa
{% endif %}

Ternary:
ternary: allows for trueval/falseval assignement dependint on conditional


Ansible 2.0
{% if variable is undefined %}

Ya no se puede hacer (fallará si no esta definida):
{% if variable %}




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
  - command: /bin/still/otro
    when: result|changed



Variable definida o no definida:
when: var
when: not var

Contenido de la salida:
when: "'reticulating splines' in output"

O que no este en la salida
when: "pepe" not in users.stdout

Que haya algo en la salida:
when: pepe.stdout.strip('') != ""

Hace una tarea u otra dependiendo si lineinfile modifica o no un fichero:
    - name: gen file
      lineinfile: dest=/tmp/ansible1/ficheroLine line="prueba contenido" create=yes
      register: result

    - debug: msg="Fichero cambiado"
      when: result.changed == True

    - debug: msg="Sin cambios"
      when: result.changed == False




    - name: Check vpn connectivity
      shell: ip -4 -o a | grep cscotun
      ignore_errors: True
      tags:
        - test
      register: vpn

    - pause: prompt="Debes estar conectado a la vpn"
      tags:
        - test
      when: vpn|failed


Salta un prompt si no podemos hacer ping a github.com
    - name: Check github connectivity
      shell: ping -qc1 -W1 github.com
      ignore_errors: True
      tags:
        - test
      register: github

    - pause: prompt="No llego a github.com"
      tags:
        - test
      when: github|faile


  roles:
    - { role: cyclops, when: "{{MONITORING.active}}" }


# Ejecutar algo si la máquina pertenece a un hostgroup
- name: prueba
  debug: msg="hola"
  when: inventory_hostname in groups['coso']

Ejecutar algo cuando no perteneces a un grupo
when: "'cluster' not in {{group_names}}"
