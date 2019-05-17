haproxy -f config


# Reload
https://www.haproxy.com/blog/truly-seamless-reloads-with-haproxy-no-more-hacks/
https://www.haproxy.com/blog/hitless-reloads-with-haproxy-howto/

http://git.haproxy.org/?p=haproxy.git;a=blob;f=contrib/systemd/haproxy.service.in;h=9b7c3d1bbcad7811609bf23c887ca38a066aa3ba;hb=HEAD
Arrancan el master-worker y envian SIGUSR2 al master para recargar.
También hace falta arrancar con -Ws para systemd, o si no, -W.


# Stop
soft stop es enviandole un SIGUSR1
pkill USR1 haproxy
