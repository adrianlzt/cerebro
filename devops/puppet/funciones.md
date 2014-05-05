http://docs.puppetlabs.com/guides/custom_functions.html

Funciones para hacer cosas especiales

There are two types of functions in Puppet: Statements and rvalues. Statements stand on their own and do not return arguments; they are used for performing stand-alone work like importing. Rvalues return values and can only be used in a statement requiring a value, such as an assignment or a case statement.

Functions execute on the Puppet master. They do not execute on the Puppet agent.
Hence they only have access to the commands and data available on the Puppet master host.
