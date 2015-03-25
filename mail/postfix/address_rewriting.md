http://www.postfix.org/ADDRESS_REWRITING_README.html

/etc/postfix/generic
direccion@original.com nueva@direccion.com

/etc/postfix/main.cf:
smtp_generic_maps = hash:/etc/postfix/generic


postmap /etc/postfix/generic
service postfix reload
