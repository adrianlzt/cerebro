https://docs.ansible.com/ansible/latest/user_guide/playbooks_conditionals.html

- name: template the file /foo.txt
  template: src=foo.j2 dest=/foo.txt owner=root group=wheel mode=0644
  when: ansible_hostname == "foo.example.com"

Con el nombre del inventario:
  when: inventory_hostname == "controller"


tasks/main.yml:
- name: set custom facts for interface
  template: src=interface.json.j2 dest=/tmp/ansible/interface.json backup=yes
  when: interface is defined

La contraria:
  when: interface is not defined

Tambien tenemos el "VARIABLE is not defiend"

when: (ansible_distribution == "CentOS" and ansible_distribution_major_version == "6") or
      (ansible_distribution == "Debian" and ansible_distribution_major_version == "7")

when: ansible_os_family == "RedHat" and ansible_distribution_major_version|int >= 6

when:
  - una condicion
  - otra condicion
  - unidas todas por AND



{% if 'http://gogolg.es/asd' | match("http://.*") %}
es http
{% else %}
es otra cosa
{% endif %}

Ternary:
ternary: allows for trueval/falseval assignement dependint on conditional
Si no ponemos else y la condicion es false, fallará la ejecucción.
foo: "{{ 'soylinux' if so == 'linux' else 'soyotro' }}"
{{ 'hpux' if so is match('^u.*') else None }}
  con regex


Ansible 2.0
{% if variable is undefined %}

Ya no se puede hacer (fallará si no esta definida):
{% if variable %}


Si una variable de un rol no está definida, valdrá None.
En ese caso podemos hacer el default con:
task:
  foo: "{{bar or 123}}"




Ejecutar tareas dependiendo de el valor del último task:
tasks:
  - command: /bin/false
    register: result
    ignore_errors: True

  - command: /bin/something
    when: result is failed

  - command: /bin/something_else
    when: result is succeeded
    when: result is success (otra opción)

  - command: /bin/still/something_else
    when: result is skipped

  - command: /bin/still/otro
    when: result is changed

Ante un comando que de rc=0 se ejecutarían la success y la changed


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
      when: result.changed

    - debug: msg="Sin cambios"
      when: not result.changed




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
when: "'cluster' not in group_names"


# Trozo de cadena en una variable
when: variable | search("casa")



Longitud de un array
- fail:
    msg: "muy largo"
  when: foo|length > 4



# Confirmación de borrado
- hosts: "{{ node | default('etcd:k8s-cluster:calico-rr') }}"
  vars_prompt:
    name: "delete_nodes_confirmation"
    prompt: "Are you sure you want to delete nodes state? Type 'yes' to delete nodes."
    default: "no"
    private: no

  pre_tasks:
    - name: check confirmation
      fail:
        msg: "Delete nodes confirmation failed"
      when: delete_nodes_confirmation != "yes"


# Filtrando por una variable común de hostvars
En este caso cada host tiene un valor en cluster.virtual_host.
Queremos que solo uno de los hosts que compartan el valor de esa variable haga algo.
Lo que hacemos es convertir el hostvars en una tupla de (inventory_hostname, valores).
Luego nos quedamos solo con los hosts cuyo virtual_host sea igual a nuestro host (en cada host tomará el valor que corresponda).
Ordenamos alfabéticamente y nos quedamos con el primero.

De esta manera, todos los hosts que compartan "cluster.virtual_host" siempre eligirán al mismo "inventory_hostname" y solo aquel cuyo hostname sea el elegido ejecutará la acción.

when:  hostvars.items() | list | selectattr("1.cluster", "defined") | selectattr("1.cluster.virtual_host", "equalto", cluster.virtual_host) | map(attribute="0") | sort | first == inventory_hostname
