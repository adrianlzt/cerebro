<https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/sect-Security-Enhanced_Linux-Troubleshooting-Top_Three_Causes_of_Problems.html>

La denegación puede que la estén provocando los permisos "normales" del sistema (DAC).

Es problema de selinux? Estará logeando

```bash
cat /var/log/audit/audit.log | audit2why
```

El proceso tiene correctamente configurado el contexto selinux?

El proceso corre en el directoro estandar? Si no tendrá labels incompatibles

Denegación de SELinux pero sin traza de log?
Desactivar las reglas dontaudit:

```bash
semodule -DB
# -D option disables dontaudit rules
# -B option rebuilds policy
```

Cuando hayamos terminado de revisar el programa que sospechábamos, volver a activar las reglas dontaudit con:

```bash
semodule -B
```

Buscar políticas con reglas dontaudit:

```bash
sesearch --dontaudit
```

# Errores

```bash
[Errno 2] No such file or directory: '/etc/selinux/targeted/contexts/files/file_contexts.local'
```

<https://bugzilla.redhat.com/show_bug.cgi?id=1395778>
Workk around: touch /etc/selinux/targeted/contexts/files/file_contexts.local

# Dependencias entre módulos

```
semodule -r testprog
libsemanage.semanage_direct_remove_key: Removing last testprog module (no other testprog module exists at another priority).
libsemanage.semanage_direct_remove_key: Removing last testprog module (no other testprog module exists at another priority).
Failed to resolve typeattributeset statement at /var/lib/selinux/targeted/tmp/modules/400/testcat/cil:21
Failed to resolve AST
semodule:  Failed!
```

Esto nos dará si intentamos borrar un módulo del que depende otro módulo (usa una interfaz).

# Problemas de reglas que no aplican?

Comprobar si el proceso corre con el domain que esperamos.

Usar ausearch para comprobar si existen los permisos que esperamos.
