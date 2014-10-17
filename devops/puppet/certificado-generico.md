https://gist.github.com/ahpook/1182243

Usar un certificado para todas las máquinas.
Usar una versión reciente de puppet


# En el puppet master
puppet cert --generate generic-hostcert.inet

mkdir -p cert_to_client/private_keys cert_to_client/ca/signed
cp /var/lib/puppet/ssl/private_keys/generic-hostcert.dsn.inet.pem cert_to_client/private_keys/
cp /var/lib/puppet/ssl/ca/signed/generic-hostcert.dsn.inet.pem cert_to_client/ca/signed/

vi /etc/puppet/puppet.conf
[master]
...
# Configuracion para certificados genericos
node_name = facter

Añadir esas dos últimas líneas (no hace falta reiniciar):
vi /etc/puppet/auth.conf
# allow nodes to retrieve their own catalog
path ~ ^/catalog/([^/]+)$
method find
allow $1
# allow the generic cert to retrieve any node's catalog
allow generic-hostcert.mydomain.com

En el cliente:

cp cert_to_client/private_keys/generic-hostcert.dsn.inet.pem /var/lib/puppet/ssl/private_keys/generic-hostcert.dsn.inet.pem
mkdir -p /var/lib/puppet/ssl/ca/signed
cp cert_to_client/ca/signed/generic-hostcert.dsn.inet.pem /var/lib/puppet/ssl/ca/signed/generic-hostcert.dsn.inet.pem

vi /etc/puppet/puppet.conf
    [agent]
       certname = generic-hostcert.mydomain.com
       node_name = facter
       node_name_fact = fqdn



## Exported resources

Todos los exported resources quedan asociados al mismo elemento, por lo que no se podria hacer un deactivate.
Habría que entrar en la base de datos y borrar según el tag (en el tag va el hostname)
