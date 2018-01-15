https://docs.ansible.com/ansible/devel/plugins.html


https://www.ansible.com/blog/how-to-extend-ansible-through-plugins

El fichero de nuestros custom plugins no se puede llamar core.py, porque entonces pisará los oficiales (solo tendremos los custom)
Mirar también como definirlos correctamente (dentro de la clase): http://www.dasblinkenlichten.com/creating-ansible-filter-plugins/



Si creamos un plugin para connection, tambien podemos meterlo en:
/usr/share/ansible/plugins/connection/
$HOME/.ansible/plugins/connection/
