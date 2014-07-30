http://docs.puppetlabs.com/puppet/3/reference/experiments_lambdas.html#removed-and-altered-functionality-as-of-puppet-34

Hay bucles en puppet pero se consideran experimentales, no para producción.
Necesitan el parser future.


Trucos para recorrer arrays o hashes sin el parser future:
https://tobrunet.ch/2013/01/iterate-over-datastructures-in-puppet-manifests/


Recursion: crear una función que se vaya llamando a si misma
http://ttboj.wordpress.com/2013/11/17/iteration-in-puppet/




Hash
$var = parsejson('{"plugin" : "load", "name" : "ssh", "exec": "/usr/bin/sshd"}')
$coso = inline_template('<%= @var.map{|k,v| puts "#{k} = #{v}" }%>')

