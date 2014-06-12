http://puppet-on-the-edge.blogspot.com.es/2014/03/heredoc-is-here.html

Starting with Puppet 3.5.0 with --parser future turned on you can now use Puppet Heredoc

Permite escribir texto multilinea con el formato:
$a = @(END)
This is the text that gets assigned to $a.
And this too.
END

notify {"variable a: $a":}


puppet apply --parser future test.pp

