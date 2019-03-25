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

if {[regexp -nocase "Linux" $results]} {
        puts "It is a Linux Machine"
} elseif {[regexp -nocase "Aix" $results]} {
        puts "It is a AIX machine"
} else {
        puts "Unknown machine"
}


# String
[string match "*$value*" $buff]
  comprobar si la variable $value está en $buff

# Regex
expect -re "awk\[^\n]+\n(.+)\r\n$PROMPT"


# Asignar variables
set b [exec cat /home/a | grep "work" | awk -F {=} {{print $2}}]

set count 0


# Timeout
Espera 5" a ver si encuentra %PROMPT%, si no, escribe Running y vuelve a esperar en el mismo expect

set timeout 5
expect {
    timeout {
        puts "Running..."
        exp_continue
    }
    "%PROMPT%" {
        puts "Finished."
    }
}
