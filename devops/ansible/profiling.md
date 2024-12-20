<https://www.redhat.com/sysadmin/faster-ansible-playbook-execution#:~:text=1.%20Identify%20slow%20tasks%20with%20callback%20plugins>

<https://docs.ansible.com/ansible/2.6/plugins/callback/profile_tasks.html>

Callback plugin que nos muestra cuanto tarda cada tarea en ejecutarse y al final un resumen de las más costosas

ansible.cfg:

```ini
[defaults]
callbacks_enabled=ansible.posix.profile_tasks
```
