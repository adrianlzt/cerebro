http://docs.puppetlabs.com/puppet/3/reference/lang_experimental_3_2.html

Starting with Puppet 3.2, you can set parser = future in puppet.conf to enable experimental new language features
puppet.conf
[master]
parser = future 


each (also available as foreach) — iterates over each element of an array or hash
collect — transforms an array or a hash into a new Array
select — filters an array or hash (include elements for which lambda returns true)
reject — filters an array or hash (exclude elements for which lambda returns true)
reduce — reduces an array or hash to a single value which is computed by the lambda
slice — slices an array or hash into chunks and feeds each result to a lambda

Todos los ejemplos suponen "--parser future":

puppet apply --parser future -e '$a=[1,2,3] each($a) |$value|{ notice $value }'

puppet apply -e '$a  = ['a','b','c'] each($a) |$index, $value| { notice "$index = $value" }'



test_lambda.pp
class monitorizacion::check_tcp ( $puerto)
{
  each ($puerto) |$p| { notice "puerto: $p" }
} 
class {'monitorizacion::check_tcp': puerto => ['22','32'] }

# puppet apply --parser future check_tcp.pp



class monitorizacion::check_http ( $puerto, $error)
{
  each ($puerto) |$i,$p| {
    notice "puerto: $p"
    notice "error: ${error[$i]}"
  }
}
class {'monitorizacion::check_http':
  puerto => ['22','32'],
  error => ['404','500']
}
