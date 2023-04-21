https://github.com/ansible/event-driven-ansible
https://www.ansible.com/use-cases/event-driven-automation

Es una app que se arranca y puede subscribirse a una cola de eventos y ejecutar playbooks en las máquinas que hayamos configurado en el inventario.

Fuentes de eventos: https://github.com/ansible/event-driven-ansible/tree/main/extensions/eda/plugins/event_sources
A parte de los típicos servidores de evntos (kafka, etc), también puede escuchar:
 - eventos del journald local
 - ticks (ejecutar periódicamente)
 - webhooks
 - etc

Un ejemplo típico es que un sistema de alertado que envía webhooks a este sistema.
Hay una serie de reglas que se evaluan y, por ejemplo, se ejecuta un playbook (o una plantilla de awk) para solucionar ese problema.
https://github.com/ansible/event-driven-ansible/tree/main/demos/dynatrace-demo
