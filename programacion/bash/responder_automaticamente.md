http://expect.sourceforge.net/

#!/usr/bin/expect -f
spawn comando o script
expect "Username: *" # El asterisco coge cualquier cosa, porque no pillaba los '['
send -- "\n"
expect "Password:"
send -- "xxxxxxx\n"
expect "accept? *"
send -- "y\n"
interact


# Chequear parametros
#read the input parameters
set host [lindex $argv 0]

#check if all were provided
if { $host == "" }  {
 puts "Falta un parametro"
 exit 1
}

