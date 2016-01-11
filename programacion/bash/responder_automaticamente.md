http://expect.sourceforge.net/

# Inline
expect -c 'spawn ./script.sh; expect "pepe: "; send "123\r"; expect eof'

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



# Condicionales
Según que lea, hace una cosa u otra

expect {
    "password for user:"  {send -- "password\n"}
    "user"
}
