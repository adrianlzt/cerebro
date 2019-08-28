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



Parar todo el playbook si cualquier nodo falla.
any_errors_fatal: true
