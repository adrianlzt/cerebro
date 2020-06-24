Ejemplo tonto para usar cgi-bin

Con la conf por defecto que instala centos, crear:
/var/www/cgi-bin/index.cgi

Con el contenido:
#!/bin/bash
echo "Content-type: text/html"
echo ""
echo "hola"


Y acceder:
curl 127.0.0.1/cgi-bin/index.cgi

Veremos "hola"
