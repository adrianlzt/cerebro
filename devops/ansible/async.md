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
