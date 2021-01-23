Para mostrar más sencillamente los errores podemos usar el callback de yaml
https://www.jeffgeerling.com/blog/2018/use-ansibles-yaml-callback-plugin-better-cli-experience
En 2.10 parece que estará en la collection community.general.yaml


https://docs.ansible.com/ansible/latest/user_guide/playbooks_error_handling.html

- name: this will not be counted as a failure
  command: /bin/false
  ignore_errors: yes

- name: Fail task when the command error output prints FAILED
  command: /usr/bin/example-command -x -y -z
  register: command_result
  failed_when: "'FAILED' in command_result.stderr"

Ejemplo donde fallo únicamente si el job ha fallado excepto para un caso de error
  register: zbx_host_register_result
  failed_when:
    - zbx_host_register_result.failed
    - '"Host cannot have more than one default interface of the same type" not in zbx_host_register_result.msg'


- shell: /usr/bin/billybass --mode="take me to the river"
  register: bass_result
  changed_when: "bass_result.rc != 2"


- name: this command prints FAILED when it fails
  command: /usr/bin/example-command -x -y -z
  register: command_result
  ignore_errors: True

- name: fail the play if the previous command did not succeed
  fail:
    msg: "the command failed"
  when: "'FAILED' in command_result.stderr"



Fallar una tarea si la tarea no falla.
Ejemplo: estamos haciendo tests y este test debe fallar.
- name: este comando debe dar error, la tarea fallara si no es el caso
  command: ls  -123
  register: cmdexec
  failed_when: "cmdexec.failed == false"


Otra manera. En este caso se verá el mensaje de error marcado en rojo, pero se ignora y no cuenta como error.
- name: este comando debe dar error, la tarea fallara si no es el caso
  command: ls -23
  register: cmdexec
  ignore_errors: True

- fail:
    msg: "El comando anterior deberia haber fallado"
  when: not cmdexec.failed




Parar todo el playbook si cualquier nodo falla.
any_errors_fatal: true



Para mostrar los errores correctamente (cambios de línea), en ansible.cfg:
[defaults]
stdout_callback = yaml
