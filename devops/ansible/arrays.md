https://docs.ansible.com/playbooks_filters.html

  - name: prueba
    command: echo -e "group_a_master_ci_3:27017\npepe\ncosa"
    register: prueba

  - debug: var=prueba.stdout_lines.1
Esto devuelve solo la primera linea

.index('pepe') nos devuelve la posicion donde esté ese elemento


Buscar en un array
when: '"cosa" in array'




ok: [127.0.0.1] => {
    "prueba.stdout_lines": [
        "group_a_master_ci_3:27017", 
        "pepe", 
        "cosa"
    ]
}



Diferencia entre listas
{{ list1 | difference(list2) }}

ej.:

  - name: obtener lista de las apps en git
    shell: ls apps/
    register: apps_git

  - name: obtener lista de las apps en local
    shell: ls apps_local/
    register: apps_local

  - debug: var=apps_git.stdout_lines
  - debug: var=apps_local.stdout_lines
  - debug: msg="{{ item }}"
    with_items: "{{ apps_git.stdout_lines| difference(apps_local.stdout_lines) }}"



# map
http://jinja.pocoo.org/docs/dev/templates/#map
De un array que nos interesa un subvalor, crear con ellos otro array:
remote_users.json.entry|map(attribute='name')|list

La estructura de datos es tipo:
remote_users.json.entry[0].name="pepe"


# Array
fruits:
    - Apple
    - Orange
    - Strawberry
    - Mango

fruits: ['uno', 'otro', 'coso']


## Concatecar
 - uno: ["uno", "dos"]
 - dos: ["tres", "cuatro"]
 - tres: "{{ uno }} + {{ dos }} + {{ [ 'cinco', 'seis' ] }}"


# Generar una lista de objetos a partir de una "lista template" y una lista para rellenar ese template
- hosts: localhost
  gather_facts: false
  vars:
    - projects:
      - pepe
      - maria
    - template_hostgroups_functional:
      - "__uno__{{project_item}}"
      - "__dos__{{project_item}}"
  tasks:
    - debug: var=env

    - set_fact:
        hgs2: "{{hgs2| default([]) }} + {{ template_hostgroups_functional }}"
      loop: "{{projects}}"
      loop_control:
        loop_var: project_item

En hgs2 tendremos:
 - __uno__pepe
 - __dos__pepe
 - __uno__maria
 - __dos__maria


# Generar una lista con campos extra y la propia lista a partir de una lista de diccionarios
- name: Test
  hosts: localhost
  gather_facts: false
  vars:
    facts:
      - bindings: [1, 2, 3]
        name: jboss1
        instance_key: "8080"
      - bindings: [9, 8]
        name: jboss2
        instance_key: "8443"
  tasks:
    - name: Fact
      ansible.builtin.set_fact:
        out: '{{ out | default([]) + [{"code": item.name+"_"+item.instance_key, "facts": item}] }}'
      loop: "{{ facts }}"

    - name: Out
      ansible.builtin.debug:
        var: out


Output:
    "out": [
        {
            "code": "jboss1_8080",
            "facts": {
                "bindings": [
                    1,
                    2,
                    3
                ],
                "instance_key": "8080",
                "name": "jboss1"
            }
        },
        {
            "code": "jboss2_8443",
            "facts": {
                "bindings": [
                    9,
                    8
                ],
                "instance_key": "8443",
                "name": "jboss2"
            }
        }
    ]

