http://docs.ansible.com/debug_module.html
ansible-playbook -vvvv  <- para poder ver los mensajes de debug

- debug: msg="System {{ inventory_hostname }} has uuid {{ ansible_product_uuid }}"

- shell: /usr/bin/uptime
  register: result

- debug: var=result

- debug: var=hostvars[groups['nfs'][0]].ansible_eth0.ipv4.address

O también:
debug: msg="{{ puppet.stdout }}"


Podemos poner:
- pause:
Para para la ejecución tras cada task a la espera de un enter.

ansible-playbook --step

# Ad-hoc
ansible MAQUINA -m debug -a var=groups
ansible MAQUINA -m debug -a msg="{{groups}}"
  con bucles no me saca nada, usar mejor:
ansible MAQUINA -m shell -a 'echo "{% for k,v in groups.iteritems() %} {{v}} {% endfor %}"'


# Debugeando modulos
http://docs.ansible.com/ansible/developing_modules.html#debugging-ansiblemodule-based-modules

Ejecutar ansible para que mantenga en remoto los ficheros python:
ANSIBLE_KEEP_REMOTE_FILES=1 ansible localhost -m ping -a 'data=debugging_session' -vvv

           Otra forma de conseguirlos:
           while true; do sleep 0.2; find ~/.ansible/tmp/ -type f -exec cp {} /tmp/ \;; done

Ir a ~/.ansible/tmp/ (podrá haber varios ansible-tmp-*)
Tendremos un fichero XXX (nombre del modulo) y un fichero command (este no siempre está).

Usaremos las siguientes opciones para analizarlos (el .py tiene almacenado dentro en base64 la info)

Podemos llamar al python setup o command con algunas opciones:
explode
  extrae la información del zip comprimido en "debug_dir" y también nos deja un fichero con los argumentos pasados

execute
  ejecuta el modulo de ansible que previamente hemos extraido con explode
  usa subprocess para llamar a python y al modulo de ansible

excommunicate
  otra forma de execute. Mejor no usarla

Para ejecutar directamente el modulo de ansible
cd debug_dir
cat args | PYTHONPATH=. python ansible_module_*.py



El fichero con el nombre de modulo:
- crea un directorio temporal estilo /tmp/ansible_XXXX
- extrae el zip que tiene como variable y lo guarda en /tmp/ansible_XXXX/ansible_modlib.zip
- extra del zip el fichero ansible_module_command.py
- lo ejecuta
- borra el dir temporal

El fichero command (obtener facts del host):
- crea un directorio temporal estilo /tmp/ansible_XXXX
- extrae el zip que tiene como variable y lo guarda en /tmp/ansible_XXXX/ansible_modlib.zip
- extra del zip el fichero ansible_module_command.py
- lo ejecuta
- borra el dir temporal

Para mantener el directorio /tmp/ansible_XXX borraremos al final la orden que borra el directorio temporal.


