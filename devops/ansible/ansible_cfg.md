Como lo configuran en kubespray
https://github.com/kubernetes-sigs/kubespray/blob/master/ansible.cfg


Opciones útiles:

```
[defaults]
# No mostrar tasks skipped
display_skipped_hosts = no
[diff]
# Ejecutar como si pusiésemos --diff
always = True
# Mostrar tiempo de ejecución de las tareas y resumen final
callbacks_enabled = profile_tasks
```
