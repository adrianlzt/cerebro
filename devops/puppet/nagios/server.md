hostname puppet
echo "puppet" > /etc/hostname

Paquete:
  puppetmaster


Tras hace el agent -t en el cliente:
puppet cert sign cliente
MEJOR, ponemos el autosign: /etc/puppet/autosign.conf = "*"


Prueba:
/etc/puppet/manifests/site.pp
file { "/tmp/puppet" :
  content => "contenido",
}


ln -s /etc/hiera.yaml /etc/puppet/
/etc/puppet/hiera.yaml
---
:backends:
  - json
:json:
  :datadir: /etc/puppet/hiera
:hierarchy:
  - "node/%{::fqdn}"
  - common


site.pp
hiera_include('classes')

Reiniciar puppet master


/etc/puppet/hiera/common.json
{
  "classes" : [
    "ntp"
  ]
}

Parece que tras modificar este fichero hace falta reiniciar puppet.
