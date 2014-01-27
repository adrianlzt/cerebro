http://docs.puppetlabs.com/puppet/2.7/reference/lang_datatypes.html

Arrays:  
[ 'one', 'two', 'three', ]

$foo = [ 'one', 'two', 'three', 'four', 'five' ]
notice( $foo[2] )

[1,2,3] + [4,5,6]   # produces [1,2,3,4,5,6]
[1,2,3] << 10 # produces [1,2,3,10]
[1,2,3] << [4,5] # produces [1,2,3,[4,5]]


Hashes: 
{ key1 => 'val1', key2 => 'val2', }

$myhash = { key => "some value", 
            other_key => "some other value" }
notice( $myhash[key] )

{a => 1} + {b => 2} # produces {a=>1, b=>2 }
