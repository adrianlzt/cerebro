man ansible-playbook
ansible-playbook --help
Chequear ambas, porque aparecen distintas opciones.

Son las recetas de chef, o los manifests de puppet.
Se escriben en YAML o python.

Estos playbooks contienen "plays". Los "plays" son las tareas que deben ejecutarse en cada host.
Cada tarea ejecutará un módulo pasándole determinados parámetros.


Ejemplo: vim-updated.yaml
---
- hosts: all
  remote_user: root
  tasks:
    - name: keep vim-enhanced package up to date
      yum: name=vim-enhanced state=latest
 
gather_facts: False on a playbook allows this implicit fact gathering to be skipped


Para ver donde se va a aplicar:
ansible-playbook playbook.yml --list-hosts
--list-tasks          list all tasks that would be executed

Dry-run / noop / check mode
ansible-playbook foo.yml --check
ansible-playbook foo.yml --check --diff  <- muestra cambios que se vayan a producir en los templates (sin --check muestra cambios producidos)


También se pueden ejecutar únicamente algunas tasks de cierto tag:
ansible-playbook playbooks/puppet-configured.yaml --tags=conf
ansible-playbook playbooks/puppet-configured.yaml -t conf

Modificar parámetros en la CLI:
ansible-playbook -e "var=cosa var2=otro" ...

O limitar a que hosts se aplicarán (mirar patterns.md):
ansible-playbook playbooks/puppet-configured.yaml --limit="webserver*"
ansible-playbook playbooks/puppet-configured.yaml -l "webserver*"

Parando antes de cada paso
--step                one-step-at-a-time: confirm each task before running


Si queremos un playbook generico y despues por linea de comandos decidir a donde aplicarlo:
playbook.yaml
- hosts: all

ansible-playbook playbook.yaml -l "grupo"
