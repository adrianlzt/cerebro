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
