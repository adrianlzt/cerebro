https://www.netfilter.org/documentation/HOWTO/netfilter-extensions-HOWTO-4.html

-j TARGET

Es como un goto en programación. El paquete que tenga -j TARGET, enviará al paquete a procesar a la regla especificada.

También hay algunos targets predefinidos:
  ACCEPT: acepta el paquete
  DROP: tira el paquete
  QUEUE: lo mete en la cola 0 (¿?)
  RETURN: hace un return a la función que lo llamo. Si no se especifica que hacer, se cogerá el valor del 'chain policy'

Mirar la lista de targets entera en: http://www.iptables.info/en/iptables-targets-and-jumps.html
