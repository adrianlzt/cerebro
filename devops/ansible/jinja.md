Poner extensiones de jinja
ansible.cfg
[defaults]
jinja2_extensions = jinja2.ext.do,jinja2.ext.i18n

<https://stackoverflow.com/a/40710177>

para obtener el dir de un path:
dirname
{{ '/foo/bar' | dirname }} -> /foo
{{ '/foo/bar/' | dirname }} -> /foo/bar

Para obtener el nombre de un fichero de un path:
basename

# Generar dict iterando con jinja

<https://groups.google.com/g/ansible-project/c/ZDz-8tcsdTA/m/xuLhnonmCgAJ>

# Gestionar espacios en blanco

<https://www.redpill-linpro.com/techblog/2023/07/19/jinja_whitespaces.html>

Si ponemos en la cabecera de los ficheros j2:

```
#jinja2: trim_blocks: True, lstrip_blocks: True
```

Será mucho más sencillo generar unas templates con un render sin problemas con los espacios en blanco.

lstrip_blocks: If set to True/"true", tabs and spaces will be removed from the beginning of the line to the start of the next block as long as no other elements are in-between.

trim_blocks: If set to True/"true", the first newline after a template tag is automatically removed, if there is nothing between the newline and the template tag. This is being enabled per default within Ansible templates.
