http://docs.puppetlabs.com/puppet/2.7/reference/lang_datatypes.html#regular-expressions

(==, !=, <, >, <=, >=), the regex match operators (=~ and !~), or the in operator (which tests whether the right operand contains the left one). 


Matches can be simple strings (like above), regular expressions, or comma-separated lists of either. 
String matching is case-insensitive, like the == comparison operator. Regular expressions are denoted with the slash-quoting used by Perl and Ruby; they’re case-sensitive by default, but you can use the (?i) and (?-i) switches to turn case-insensitivity on and off inside the pattern. Regex matches also assign captured subpatterns to $1, $2, etc. inside the associated code block, with $0 containing the whole matching string.

Ejemplo:
case $ipaddress_eth0 {
      /^127[\d.]+$/: { 
        notify {'misconfig': 
          message => "Possible network misconfiguration: IP address of $0",
        } 
      }
}


if $host =~ /^www(\d+)\./ {
  notify { "Welcome web server #$1": }
}


Comprobar si una variable es una ip:
if $host =~ /^(\d+)+\.(\d+)+\.(\d+)+\.(\d+)+/ {
  notify { "es una ip": }
} else {
  notify { "NO es una ip": }
}

