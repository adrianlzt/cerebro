https://docs.ansible.com/ansible/latest/user_guide/playbooks_checkmode.html


Ejecutar task aunque estemos en check_mode:
check_mode: no


Si queremos una tarea que siempre se ejecute en modo check (es decir, que no haga cambios):
check_mode: yes


Skipear una tarea cuando estemos en check mode
when: not ansible_check_mode
