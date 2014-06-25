http://docs.puppetlabs.com/pe/latest/trouble_puppet.html
https://wikitech.wikimedia.org/wiki/Puppet/Performance_investigation

Si queremos ver donde se va el tiempo en puppet:

En el master activar la opción debug.
En el cliente ejecutar con --profile

En el log del puppetmaster irán apareciendo trazas con la palabra PROFILE con el tiempo que se lleva cada parte.


Ver las trazas que tardaron más de 1s:
cat puppetmaster.log | grep 70205411162360 | grep -v " took 0."
