http://docs.ansible.com/playbooks_roles.html

Son como los módulos de puppet

Se puede inicializar uno con:
ansible-galaxy init nombre


Para usarlo dentro de un playbook:
- hosts: webservers
  roles:
    - common
    - { role: foo_app_instance, dir: '/opt/a',  port: 5000 }
    - { role: some_role, when: "ansible_os_family == 'RedHat'" }
    - { role: foo, tags: ["bar", "baz"] }  <- asigno tags a un rol


El fichero importante será tasks/main.yaml
El deteminará las tareas a ejecutar.
Podemos usar includes dentro de este fichero para separar las tareas.

Si necesitamos usar templates pondemos usar directamente src=fichero.j2 y lo leerá del directorio templates/

En defaults/main.yml podemos poner variables globales:
kibana_nginx_config_path: /etc/nginx/sites-enabled
