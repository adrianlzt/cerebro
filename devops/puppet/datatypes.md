http://docs.puppetlabs.com/puppet/3.6/reference/lang_datatypes.html#arrays

## Arrays ##
[ 'one', 'two', 'three', ]

$foo = [ 'one', 'two', 'three', 'four', 'five' ]
notice( $foo[2] )

notice {"valor: ${exec[0]}":}

[1,2,3] + [4,5,6]   # produces [1,2,3,4,5,6]
[1,2,3] << 10 # produces [1,2,3,10]
[1,2,3] << [4,5] # produces [1,2,3,[4,5]]

member(['a','b'], 'b')
devuelve true o false


## Hashes ##
{ key1 => 'val1', key2 => 'val2', }

$myhash = { key => "some value", 
            other_key => "some other value" }
notice( $myhash[key] )

Las "claves" deben estar entrecomilladas o en minúscula.
NO se puede hacer { Clave => "valor" }

{a => 1} + {b => 2} # produces {a=>1, b=>2 }

prefix(['a','b','c'], 'p')
Will return: ['pa','pb','pc']

values() nos devuelve los valores de un hash
keys() para obtener un array con las keys


No se puede poner [] sobre una función
split($eexec," ")[0] INCORRECTO!

