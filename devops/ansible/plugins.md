https://docs.ansible.com/ansible/latest/dev_guide/developing_plugins.html
https://docs.ansible.com/ansible/devel/plugins.html


https://www.ansible.com/blog/how-to-extend-ansible-through-plugins

El fichero de nuestros custom plugins no se puede llamar core.py, porque entonces pisará los oficiales (solo tendremos los custom)
Mirar también como definirlos correctamente (dentro de la clase): http://www.dasblinkenlichten.com/creating-ansible-filter-plugins/



Si creamos un plugin para connection, tambien podemos meterlo en:
/usr/share/ansible/plugins/connection/
$HOME/.ansible/plugins/connection/


Podemos meter distintos tipos de plugins custom en directorios a nivel del playbook o del role:
  filter_plugins/
  lookup_plugins/
  module_plugins/
