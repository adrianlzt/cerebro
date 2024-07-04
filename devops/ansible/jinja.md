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
