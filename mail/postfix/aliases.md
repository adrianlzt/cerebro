http://www.postfix.org/aliases.5.html

vi /etc/aliases
nombre: direccionlocal
nombre: direccion@externa.com

postalias /etc/aliases


Si intenamos poner:
direccion@externa.com: otra@direc.com

postalias nos dice:
postalias: warning: aliases, line 99: name must be local

Para eso mirar address_rewriting.md
