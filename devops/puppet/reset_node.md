Si hemos hecho un puppet node clean <nodo> y el master ya no nos registra:
rm -fr /var/lib/puppet

Definimos el server en el puppet.conf
puppet agent --test

En el server aceptamos el certificado
puppet cert sign <blabla>
