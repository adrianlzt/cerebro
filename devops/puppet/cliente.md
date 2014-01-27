Testear conectividad con el master:
puppet agent --server puppet.domain.com --test


Configuración básica de un slave:
/etc/puppet/puppet.conf:
[main]
        server = puppet

Y para conectar con el master:
puppet agent --test


Para conectar con un nombre de cliente distinto
puppet agent -t --certname maquina.com
