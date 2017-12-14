http://jinja2test.tk/
mirar la consola del navegador por si da errores el server

Probar haciendo uso de ansible:

ansible localhost -m template -a "src=/var/tmp/coso.j2 dest=/var/tmp/mio"
