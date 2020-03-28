http://docs.ansible.com/playbooks_intro.html#handlers-running-operations-on-change

Son los que se encargan del reinicio de los servicios.
Son ejecutados solo una vez aunque sean llamados varias veces.
Se ejecutan en el orden de escritura, no el orden que sean llamados.

    - name: Restart nginx
      service: name=nginx state=restarted

    # Tambien podemos meter chequeos
    - name: Check nginx
      wait_for: port={{ nginx_port }} delay=5 timeout=10

    # Any module can be used for the handler action
    - name: Restart application
      command: /srv/myapp/restart.sh

    # Pacemaker con pcs:
    - name: Restart pnp4nagios worker
      run_once: True
      shell: /usr/sbin/pcs resource meta {{rsc}} target-role=Stopped; sleep 3; /usr/sbin/pcs resource meta {{rsc}} target-role=Started



Se llaman desde un comando con:
    - name: roll out new code
      git: repo=ssh://git@github.com/mylogin/hello.git dest=/home/mylogin/hello
      notify:
        - Restart nginx
        - Restart application

Realizar tareas de los handlers sin esperar al final
tasks:
   - shell: some tasks go here
   - meta: flush_handlers
   - shell: some other tasks



# Handler con varias tasks
http://stackoverflow.com/questions/31618967/how-do-i-write-an-ansible-handler-with-multiple-tasks

- name: Restart conditionally
  include: restart_tasks.yml

Y en restart_tasks.yml metemos las tareas que queremos hacer


- name: comprobamos si apache se encuentra corriendo
  shell: pgrep -P 1 httpd
  register: httpd_status
  ignore_errors: True

- name: recargamos apache si esta ejecutandose
  service: name=httpd state=restarted
  when: httpd_status.rc == 0



# Cuando se ejecutan
Al final de cada play
O cuando los forzamos con el flush
