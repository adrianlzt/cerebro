http://www.ansibleworks.com/
Ansible is a radically simple IT orchestration engine that makes your applications and systems easier to deploy. Avoid writing scripts or custom code to deploy and update your applications— automate in a language that approaches plain English, using SSH, with no agents to install on remote systems.

For most Ansible modules a connection to the remote device will be done over ssh, then Ansible will upload Python scripts to the node which is to be managed. These scripts are then run locally on the remote machine and the result is then reported back to the initiator.

Funciona en modo push (el servidor llama a los clientes)

AWX: web UI de pago (10 máquinas gratis)

Interactive ansible shell
https://github.com/dominis/ansible-shell

Tiene también funcionalidad tipo mcollective de puppet.


Conceptos:

Playbook: fichero donde se define que acciones vamos a tomar sobre que nodos
Los playbooks están compuestos por plays.
Los plays son cada grupo de acciones+nodos donde aplicar.
Los plays pueden tener varias tasks o roles.
Una task es una tarea en particular (crear un fichero, instalar un paquete, etc)
Un role es un conjunto de tasks, donde pueden haber ficheros, templates, vars, etc.
