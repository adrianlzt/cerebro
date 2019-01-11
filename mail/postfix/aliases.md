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



Los alias solo son para delivieres locales.
Si queremos modificar envios remotos usar https://serverfault.com/questions/744761/postfix-aliases-will-be-ignored
virtual_alias_maps = hash:/etc/postfix/virtual
postmap /etc/postfix/virtual
postfix reload

Si cuando intento enviar a root me completa con root@domain, poner "root@domain" en el virtual para convertir a lo que queremos.
