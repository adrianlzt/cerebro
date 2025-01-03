<http://dnf.baseurl.org/2015/05/11/yum-is-dead-long-live-dnf/>

Mejora sobre yum.

Tiene versión en C para docker, sin depender de python: microdnf

# Download rpm

dnf download nombre-paquete

# Excluir paquetes

Evitar que se actualicen

excludepkgs=foo,bar,baz

## Version lock

Algo similar, usando un plugin.

Para instalar el plugin:
dnf install 'dnf-command(versionlock)'
dnf versionlock add sqlite-libs

Mete líneas en el fichero (pero parece que no funciona bien si las meto a mano):
/etc/dnf/plugins/versionlock.list

Se puede hacer con ansible
<https://docs.ansible.com/ansible/latest/collections/community/general/dnf_versionlock_module.html>

# Vars

/etc/dnf/vars/foo = "baz"
Debería ser como setear la variable "foo" en el fichero de configuración con valor "baz"

Con excludepkgs no me ha funcionado.

# Protected packages

Meter un fichero en /etc/yum/protected.d/\*.conf con los nombres de los paquetes que deben ser protegidos de ser borrados.

# Plugins

<https://dnf-plugins-core.readthedocs.io/en/latest/index.html>

A parte de los que vienen, podemos instalar más con dnf-plugins-core

# Dependencias

```bash
dnf deplist PAQUETE
```

Eso nos dará las deps del paquete más moderno.
Si queremos del paquete que tenemos instalado:

```bash
dnf deplist PAQUETE --installed
```

Obtener dos niveles de dependencias de un paquete:

```bash
for i in $(dnf repoquery --requires --resolve git); do echo -e "\n$i:"; dnf repoquery --requires --resolve $i; done
```
