http://docs.ansible.com/playbooks_roles.html
http://www.azavea.com/blogs/labs/2014/10/creating-ansible-roles-from-scratch-part-1/

Son como los módulos de puppet

Se puede inicializar uno con:
ansible-galaxy init nombre


Para usarlo dentro de un playbook:
- hosts: webservers
  roles:
    - common
    - { role: foo_app_instance, dir: '/opt/a',  port: {{puerto_http}} } <- haremos override de lo que esté definido en defaults/ o vars/
    - { role: some_role, when: "ansible_os_family == 'RedHat'" }
    - { role: foo, tags: ["bar", "baz"] }  <- asigno tags a un rol


Preferencias versión reducida (de mayor a menor). Mirar variables.md para la versión completa:
  parámetros al definir el rol
  directorio vars/ (aqui siempre se usará main.yml, a no ser que usemos un include_vars en algun task)
  directorio defaults/

Si hacemos uso de una variable en un task y no está definida en ninguno de estos tres sitios fallará.
Si un rol tiene una variable que se llama {{nombre}}, esa variable puede estar definida en cualquier sitio aceptado por variables. Por ejemplo, puede ser un valor que coja el playbook mediante un vars_files


El fichero importante será tasks/main.yaml
El deteminará las tareas a ejecutar.
Podemos usar includes dentro de este fichero para separar las tareas.

Si necesitamos usar templates pondemos usar directamente src=fichero.j2 y lo leerá del directorio templates/

En defaults/main.yml podemos poner variables globales:
kibana_nginx_config_path: /etc/nginx/sites-enabled


main.yaml:
---
# tasks file for icinga
- include: repos.yml
- include: install.yml
- include: configure.yml
  when: "'reticulating splines' in output"


repos.yaml:
- name: cosa
  modulo: parametros


# Orden en tareas 
- hosts: webservers

  pre_tasks:
    - shell: echo 'hello'

  roles:
    - { role: some_role }

  tasks:
    - shell: echo 'still busy'

  post_tasks:
    - shell: echo 'goodbye'


# Dependencias
roles/myapp/meta/main.yml:

---
dependencies:
  - { role: common, some_parameter: 3 }
  - { role: apache, port: 80 }
  - { role: postgres, dbname: blarg, other_parameter: 12 }


# Estructura
No usar directorios dentro de tasks/ porque entonces no encontrará bien los ficheros de files/ o templates/
