Si tenemos systemd mirar linux/systemd/socket-proxyd.md


http://sammy.net/~sammy/hacks/

http://linux.die.net/man/1/redir
Redir redirects tcp connections coming in to a local port to a specified address/port combination.

A port redirector, used to forward incoming connections to somewhere else. by far the cleanest piece of code here, because someone else liked it enough to fix it.


redir --lport=8002 --cport=2222
8002 -> 2222



redir --laddr=192.168.1.2 --lport=8002 --caddr=192.168.1.3 --cport=2222
192.168.1.2:8002 -> 192.168.1.3:2222
