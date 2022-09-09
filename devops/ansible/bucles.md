https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html

Lo nuevo es usar "loop".
with_XXX es el formato antiguo (anque with_lines sigue siendo válido)

No se puede usar {{item}} en el name

- name: install packages loop
   yum: name={{ item }} state=present
   loop:
     - vim-enhanced
     - screen
     - nano
     - mlocate

O con una variable: loop: "{{ somelist }}"

- name: add several users
  user: name={{ item.name }} state=present groups={{ item.groups }}
  loop:
    - { name: 'testuser1', groups: 'wheel' }
    - { name: 'testuser2', groups: 'root' }

Definir el nombre de la variable "item":
loop_control:
    loop_var: outer_item

# copy each file over that matches the given pattern
- copy: src={{ item }} dest=/etc/fooapp/ owner=root mode=600
  with_fileglob:
    - /playbooks/files/fooapp/*
  # When using a relative path with with_fileglob in a role, Ansible resolves the path relative to the roles/<rolename>/files directory.

Si queremos usar with_fileglob con templates:
  with_fileglob:
    - ../templates/*

dir/* no pilla ficheros "ocultos" (por ejemplo .fichero)

Podemos poner
  with_fileglob:
    - ../templates/*
    - ../templates/.*

CUDIADO, no pilla necesariamente en orden alfabético.
Para que se asi (https://stackoverflow.com/q/59162054)
loop: "{{ query('fileglob', \"<ansible directory>/testing/files/*\")|sort }}"


# Chequea un comando hasta que devuelve la cadena que queremos
# Si al quinto intento falla, falla la task
- shell: /usr/bin/foo
  register: result
  until: result.stdout.find("all systems go") != -1
  retries: 5
  delay: 10

La task ejecutada por until será siempre la misma, es decir, si tenemos puesto un jinja en el argumento, se renderizará la primera vez y luego siempre usará el mismo.
workaround, blocks + llamadas recursivas:
https://github.com/ansible/ansible/issues/46203#issuecomment-556013701


- command: /bin/false
  register: result
  until: result|success
  retries: 3
  delay: 1

# De la lista de máquinas del grupo icinga, intenta obtener el uuid de una de sus interfaces
# Como la máquina tarda en aparecer, esperamos hasta encontrar algo (caracter no vacío) en la salida.
# Todos los resultados se guardan en la variable icinga_ports_uuids, en forma de array en icinga_ports_uuids.results
- name: obtain port uuid for icinga hosts
  shell: nova --insecure interface-list {{ item }} | grep {{ vip_net_uuid.stdout }} | cut -d ' ' -f 8
  loop: groups['icinga']
  register: icinga_ports_uuids
  until: icinga_ports_uuids.stdout.strip('') != ""
  retries: 5
  delay: 5

# Ejecutar algo sobre todos los hosts
groups['all']


## Ejecutar un comando sobre las lineas de stdout de otro comando
- name: Example of looping over a REMOTE command result
  shell: /usr/bin/something
  register: command_result

- name: Do something with each result
  shell: /usr/bin/something_else --param {{ item }}
  loop: command_result.stdout_lines



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

ansible MAQUINA -m shell -a 'echo "{% for k,v in groups.iteritems() %} {{v}} {% endfor %}"'



# Loops con register:
http://docs.ansible.com/playbooks_loops.html#using-register-with-a-loop
Hay que hacer el with_item sobre VARIABLE.results

- name: Fail if return code is not 0
  fail:
    msg: "The command ({{ item.cmd }}) did not have a 0 return code"
  when: item.rc != 0
  loop: echo.results


# Guardo todos los valores que obtengo por cada una de las maquinas del grupo 'icinga' en la variable icinga_ports_uuids
# Luego guardo cada uno de esos valores en un fichero distinto
- name: testing
  shell: nova --insecure interface-list {{ item }} | grep {{ vip_net_uuid.stdout }} | cut -d ' ' -f 8
  loop: groups['icinga']
  register: icinga_ports_uuids

- copy: content={{item.stdout}} dest="/tmp/ansible.prueba.{{item.item}}"
  loop: icinga_ports_uuids.results



# Iterar conociendo el índice
Tengo dos listas, collector_ips y collectors_port_uuid.
Itero sobre collectors_port_uuid y voy usando el indice para iterar tambien sobre collector_ips

- pause: prompt="{{item.0}} --> uuid {{item.1.stdout}} {{collector_ips[item.0]}} "
  with_indexed_items: collectors_port_uuid.results



# Un loop que llama a otro loop
Si tenemos un loop que llama, por ejemplo, a un include_role, y dentro de ese rol hay otro loop la variable de iteración ("item") colisionará.

Para usar variables distintas:
- name: crear vm para cada comput, enlazada a esta red y mgmt
  os_server:
    name: "{{server_prefix}}-inet-{{compute_item}}"
  loop: "{{compute_nodes}}"
  loop_control:
    loop_var: "compute_item"



# Iterar un número de veces
https://docs.ansible.com/ansible/latest/plugins/lookup/sequence.html
- name: a simpler way to use the sequence plugin create 4 groups
  group:
    name: "group{{ item }}"
    state: present
  with_sequence: count=4


# Iterar sobre una lista generada a partir de un filtro sobre un array de dicts
Nos quedamos con los dicts que tengan la key "cluster" definida, y obtenmos la lista de valores únicos de esa key:
      with_items: "{{process_monitor__process_list|selectattr('cluster', 'defined')|map(attribute='cluster')|unique}}"


# Ejecutar un comando y hacer algo con sus lineas
- name: We could read the file directly, but this shows output from command
  debug: msg="{{ item }} is an output line from running cat on /etc/motd"
  with_lines: cat /etc/motd

- name: More useful example of looping over a command result
  shell: "/usr/bin/frobnicate {{ item }}"
  with_lines:
    - "/usr/bin/frobnications_per_host --param {{ inventory_hostname }}"


# Selecionar el primer fichero que encontremos de una lista
- name: load OS/version specific variables
  include_vars: "{{ item }}"
  with_first_found:
    - files:
        - "{{ansible_system}}_{{ansible_os_family}}_{{ansible_distribution_major_version}}.yml"
        - "{{ansible_system}}_{{ansible_os_family}}.yml"
        - "{{ansible_system}}.yml"
        - "default.yml"
    - paths:
        - "../vars/"


# Tener el índice de la iteración por la que vamos
- name: Count our fruit
  ansible.builtin.debug:
    msg: "{{ item }} with index {{ my_idx }}"
  loop:
    - apple
    - banana
    - pear
  loop_control:
    index_var: my_idx


# nested / doble loop
https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html#iterating-over-nested-lists

- name: Give users access to multiple databases
  community.mysql.mysql_user:
    name: "{{ item[0] }}"
    priv: "{{ item[1] }}.*:ALL"
    append_privs: yes
    password: "foo"
  loop: "{{ ['alice', 'bob'] | product(['clientdb', 'employeedb', 'providerdb']) | list }}"

En item.0 (o item[0]) tendremos a "alice" y "bob", en item.1 a "clientdb" y el resto de dbs.
Hemos hecha una multiplicación de una lista por la otra.
