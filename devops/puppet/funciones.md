http://docs.puppetlabs.com/guides/custom_functions.html

Funciones para hacer cosas especiales

There are two types of functions in Puppet: Statements and rvalues. Statements stand on their own and do not return arguments; they are used for performing stand-alone work like importing. Rvalues return values and can only be used in a statement requiring a value, such as an assignment or a case statement.

Functions execute on the Puppet master. They do not execute on the Puppet agent.
Hence they only have access to the commands and data available on the Puppet master host.


Ejemplo:
modules/stdlib/lib/puppet/parser/functions/is_ip_dsn.rb 

module Puppet::Parser::Functions
  newfunction(:is_ip_dsn, :type => :rvalue, :doc => <<-EOS
Returns true if the variable passed to this function is a ip with valid masks.
    EOS
  ) do |arguments|

    raise(Puppet::ParseError, "is_ip_dsn(): Wrong number of arguments " +
      "given (#{arguments.size} for 1)") if arguments.size < 1

    type = arguments[0]

    rango = type.split('.')

     mask  = [rango[0].to_i,rango[1].to_i]

    valid_masks = [
      [10,26],
      [10,28],
      [172,31],
      [10,101]
    ]

    print "Arg: " + type
    return valid_masks.include?(mask) ? true : false
  end
end
