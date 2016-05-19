http://www.postfix.org/QSHAPE_README.html#maildrop_queue

Directorio donde se almacenan los correos antes de ser procesados por postfix.
Si el directorio está muy lleno puede ser porque postfix está parado.


Poner todos los mensajes en la cola activa:
postfix flush

Si queremos borrar todos los emails de la cola:
postsuper -d ALL

Solo de una cola:
postsuper -d ALL deferred


Borrar los mensajes enviados por root@sys
mailq | tail -n +2 | grep -v -e '^ *(' -e "^--" | awk 'BEGIN { RS = "" } {if ($7 == "root@sys") print $1;}' | postsuper -d -

Borrar los mensajes dirigios a spam@spam.com
mailq | tail -n +2 | grep -v -e '^ *(' -e "^--" | awk 'BEGIN { RS = "" } {if ($8 == "spam@spam.com") print $1;}' | postsuper -d -


