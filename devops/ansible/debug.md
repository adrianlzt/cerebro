https://docs.ansible.com/ansible/latest/user_guide/playbooks_debugger.html
http://docs.ansible.com/ansible/latest/playbooks_debugger.html
https://docs.ansible.com/ansible/latest/user_guide/playbooks_debugger.html#resolving-errors-in-the-debugger

- hosts: test
  strategy: debug

Si falla algo se para y nos arranca el debugger de python en ese punto
Nos da un debugger muy limitado

> p locals().keys()
dict_keys(['task', 'task_vars', 'host', 'play_context', 'result'])

Variables disponibles:
p locals()['task_vars'].keys()

Parámetros que puede tener la task:
p dir(locals()['task'])
p result._task_fields

Parámetros del play donde está esta task:
p dir(locals()['play_context'])

Parámetros del host:
p dir(locals()['host'])

Argumentos de la task:
p task.args

Modificar los argumentos:
task.args['data'] = '{{ var1 }}'

Resultado de la task:
p result._result

Rejecutar la task (avanzará si no hay fallo)
redo




Debug a lo bestia:
ANSIBLE_DEBUG=true ansible -vvvvvv ...

Podemos tambien meter en el código:
import epdb; epdb.st()


http://docs.ansible.com/debug_module.html
ansible-playbook -vvvv  <- para poder ver los mensajes de debug
Se pueden poner hasta 6 -v

https://github.com/ansible/ansible/blob/devel/hacking/test-module#L28
Script para testear modulos


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
Tambien se puede poner esta variable en el ansible.cfg (mirar ansible-config list -> [defaults] keep_remote_files = true)

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

python /home/centos/.ansible/tmp/ansible-tmp-1653945205.1161072-2702643-215610572871479/AnsiballZ_credential_type.py execute
Esto ejecutará el código "exploded" con las args que estén en ese dir.
Podemos probar a modificar el código exploded o meter breakpoints.
Parece que no funciona con "breakpoint()" ni epdb.set_trace()


ANTIGUO
Para ejecutar directamente el modulo de ansible
cd debug_dir
cat args | PYTHONPATH=. python ansible_module_*.py

Con los AnsiballZ parece que solo hace falta:
python __main__.py args
python -m pdb __main__.py args

O en versiones más nuevas:
PYTHONPATH=. python ansible/modules/zbx_user.py args

Parece que con la nueva versión de ansible 2.9, ya no tenemos un fichero __main_.py.
Tendremos que ejecutar directamente el módulo, ej.:
python ./ansible/modules/monitoring/zabbix/zabbix_host.py args


Para hacer debug (antiguos no soportan el args como param?):
 En una terminal:
  mkfifo stdin stdout
  (cat stdout &) && cat > stdin

 En otra terminal (en el mismo dir):
  modificamos el .py para meterle el set_trace() de la siguiente manera:
    import pdb
    mypdb=pdb.Pdb(stdin=open('stdin','r'), stdout=open('stdout','w'))
    pdb.set_trace=mypdb.set_trace
    pdb.set_trace()

  Arrancamos el programa que necesita stdin, en otra terminal:
    cat args | PYTHONPATH=. python ansible_module_*.py

 En la primera terminal tendremos el pdb.




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



# PDB
https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!topic/ansible-project/wL7oS5ktRwQ
pip install epdb

Meter donde queramos parar
import epdb
epdb.set_trace()

No funciona a partir de python 3.7??
