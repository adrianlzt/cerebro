http://docs.ansible.com/playbooks_async.html

Para ejecutar tareas que tardan mucho. La ejecutamos y periódicamente ansible chequea si ha terminado:

  - name: simulate long running op (15 sec), wait for up to 45 sec, poll every 5 sec
    command: /bin/sleep 15
    async: 45
    poll: 5


También se puede ejecutar una tarea y pasar a la siguiente (fire and forget):
  - name: simulate long running op, allow to run for 45 sec, fire and forget
    command: /bin/sleep 15
    async: 45
    poll: 0


O hacer un fire and forget, y posteriormente ver si ha terminado:
- name: 'YUM - fire and forget task'
  yum: name=docker-io state=installed
  async: 1000
  poll: 0
  register: yum_sleeper

- name: 'YUM - check on fire and forget task'
  async_status: jid={{ yum_sleeper.ansible_job_id }}
  register: job_result
  until: job_result.finished
  retries: 30


# Internals
Lo que hace es crear un fichero $HOME/.ansible_async/524489329660.3210556 donde, tras ejecutar al acción, deja el contenido:
{"started": 1, "finished": 0, "ansible_job_id": "524489329660.3210556"}

Luego la tarea "async_status" irá comprobando ese fichero.

Cuando la tarea principal ha termiando, en ese fichero habrá un volcado del output y el async lo recuperará de ahí para seguir con las tareas.

# Debug
Si usamos ANSIBLE_KEEP_REMOTE_FILES=1, en el directorio, a parte del típico AnsiballZ veremos un async_wrapper.py

Podemos ver como lo ejecuta ansible si lanzamos el playbook con -vvvv
Hará algo de este tipo:
python async_wrapper.py 11111111 600 /home/awxtask/.ansible/tmp/ansible-tmp-1678694008.9198644-1457-67922134023490/AnsiballZ_docker_container.py _ -preserve_tmp


Siendo los params:
usage: async_wrapper <jid> <time_limit> <modulescript> <argsfile> [-preserve_tmp]


También se le puede hacer "explode" al async_wrapper.py

Mirando el código del async_wrapper lo que hace es:
 - forkea, con el proceso principal contestando a ansible y escribiendo el fichero de estado temporal.
 - el child se vuelve a forkear en dos.
   - el child ejecuta el módulo
   - el parent se queda comprobando cuando ha terminado

Si queremos modificar para poder ejecutar el async_wrapper con execute, tendremos que modificar una parte del código, porque solo hace "debug" si tenemos dos parámetros (y al async_wrapper le tenemos que pasar más).
