https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Troubleshooting-Top_Three_Causes_of_Problems.html

La denegación puede que la estén provocando los permisos "normales" del sistema (DAC).

Es problema de selinux? Estará logeando
cat /var/log/audit/audit.log | audit2why

El proceso tiene correctamente configurado el contexto selinux?

El proceso corre en el directoro estandar? Si no tendrá labels incompatibles

Denegación de SELinux pero sin traza de log?
Desactivar las reglas dontaudit:
semodule -DB
  -D option disables dontaudit rules
  -B option rebuilds policy

Cuando hayamos terminado de revisar el programa que sospechábamos, volver a activar las reglas dontaudit con:
semodule -B

Buscar políticas con reglas dontaudit:
sesearch --dontaudit


# Errores
[Errno 2] No such file or directory: '/etc/selinux/targeted/contexts/files/file_contexts.local'
https://bugzilla.redhat.com/show_bug.cgi?id=1395778
Workk around: touch /etc/selinux/targeted/contexts/files/file_contexts.local
