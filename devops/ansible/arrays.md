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
