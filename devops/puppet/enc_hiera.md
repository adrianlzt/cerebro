# ENC
Para usar hiera como External Node Classifier pondremos lo siguiente el el site.pp
hiera_include('classes')

Cuidado, no se pueden ordenar las clases.

REINICIAR TRAS PONER ESTO EN EL SITE.PP!

Los nodos leeran todos los datasources que le correspondan, y se le aplicarán todas las clases que estén bajo "classes".
Una clase solo se puede aplicar una vez. Asi que cogerá la primera que encuentre segun el hierachy de hiera.yaml.
Ejemplo http://docs.puppetlabs.com/hiera/1/puppet.html#assigning-classes-to-nodes-with-hiera-hierainclude:
classes:
      - base
      - security
      - mcollective

En JSON (no vale dejarse comas al final):
{
   "classes" : [
	   "ntp",
	   "apache",
	   "postfix"
   ],
   "ntp::variable": "valor variable clase parametrizable"
}

Clases parametrizables, hiera, enc: https://ask.puppetlabs.com/question/3608/parametrized-classes-with-hiera_includeclasses/


Si al usar hiera como ENC nos sale el error:
Error: Could not retrieve catalog from remote server: Error 400 on SERVER: malformed format string - %S at /etc/puppet/manifests/site.pp:1 on node client
o
Error: Could not retrieve catalog from remote server: wrong header line format


Puede que sea problema del hiera del puppetmaster, que no esté bien definido algún fichero.
Probar en el puppetmaster con "hiera classes ::hostname=blabla"

Hacer pruebas con el facter de producción para ver si falla.


Usar defined types con hiera como ENC (el del blog no funciona con puppet 3.3.2, mirar mi github para un ejemplo que funciona, y que permite repetir defined types):
http://blog.yo61.com/assigning-resources-to-nodes-with-hiera-in-puppet/
https://github.com/adrianlzt/puppet-monitoring/tree/hiera_resources
https://tickets.puppetlabs.com/browse/HI-121

En RHEL:
/usr/lib/ruby/site_ruby/1.8/puppet/parser/functions/hiera_resources.rb



Se puede usar también las dos aproximaciones, aplicar clases y aplicar defined types:
site.pp
hiera_resources('resources')
hiera_include('classes')
