Host *+*
  StrictHostKeyChecking no
  ProxyCommand ssh -q -W $(echo %h | sed 's/^.*+//;/:/!s/$/ %p/;s/ /:/') $(echo %h | sed 's/+[^+]*$//;s/\([^+%%]*\)%%\([^+]*\)$/\2 -l \1/;s/:/ -p /')

ssh pasarela+destino

ssh pasarela:puerto+destino:puerto

es importante que este deshabilitado el StrictHostKeyChecking

Gracias @ogarcia
