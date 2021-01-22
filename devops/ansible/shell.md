mirar command.md

- name: echo prueba 
  shell: echo 'still busy'


- name: guarda el ultimo tag
  shell: /usr/bin/git tag -l | sort -g | tail -1 chdir=/tmp/puppet-monitoring-ui/dev
  register: last_tag


# Ejecuta como usuario cyclops
- name: insert localhost as known host for ssh
  shell: /usr/bin/ssh-keyscan -H localhost > /home/cyclops/.ssh/known_hosts
  sudo: yes
  sudo_user: 'cyclops'
  args:
    creates: /home/cyclops/.ssh/known_hosts


# Ad-Hoc
ansible icinga -m shell -a "/usr/sbin/ss -lntp | grep 80"


# Variable generada por la ejecucción de un shell
"mongo_cluster": {
    "changed": true, 
    "cmd": "/bin/echo 0", 
    "delta": "0:00:00.005797", 
    "end": "2015-03-02 11:48:39.487307", 
    "invocation": {
        "module_args": "/bin/echo 0", 
        "module_name": "shell"
    }, 
    "rc": 0, 
    "start": "2015-03-02 11:48:39.481510", 
    "stderr": "", 
    "stdout": "0", 
    "stdout_lines": [
        "0"
    ], 
    "warnings": []
}

