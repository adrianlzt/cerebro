Testear conectividad con el master:
puppet agent --server puppet.domain.com --test


Configuración básica de un slave:
/etc/puppet/puppet.conf:
[main]
        server = puppet
        configtimeout = 500
        # How long the client should wait for the configuration to be retrieved before considering it a failure
        runinterval = 30m
        # 30m es el default. Cada cuanto debe ejecutarse el agente

Y para conectar con el master:
puppet agent --test


Para conectar con un nombre de cliente distinto
puppet agent -t --certname maquina.com
