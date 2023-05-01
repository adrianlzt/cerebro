https://docs.ansible.com/ansible/latest/collections/ansible/builtin/slurp_module.html

Leer ficheros de una máquina remota y almacenarlos en una variable en base64

- name: Find out what the remote machine's mounts are
  ansible.builtin.slurp:
    src: /proc/mounts
  register: mounts

- name: Print returned information
  ansible.builtin.debug:
    msg: "{{ mounts['content'] | b64decode }}"
