haproxy -f config


# Reload
https://www.haproxy.com/blog/truly-seamless-reloads-with-haproxy-no-more-hacks/
https://www.haproxy.com/blog/hitless-reloads-with-haproxy-howto/

## Forma de systemd (master-worker)
http://git.haproxy.org/?p=haproxy.git;a=blob;f=contrib/systemd/haproxy.service.in;h=9b7c3d1bbcad7811609bf23c887ca38a066aa3ba;hb=HEAD
Arrancan el master-worker y envian SIGUSR2 al master para recargar.
También hace falta arrancar con -Ws para systemd, o si no, -W.
Esto lo que hará es arrancar un nuevo child, pasarle los sockets y matar el viejo.

pkill -USR2 haproxy

Si la conf no es correcta, no reiniciará.


## Forma con un segundo proceso tomando el lugar del que corre
haproxy -D -f config -p ha.pid
  arrancamos haproxy en modo daemon y genera fichero con el pid

Para recargar arrancamos otro haproxy pasándole el pid con -sf para que mate al anterior tras arrancar
haproxy -D -f config -p ha.pid -sf $(cat ha.pid)


Si queremos seamless restart, tendremos que arrancar con un "stats socket" con la opción "expose-fd listeners" (tendrá que ser unix-socket)
Para recargar arrancaremos otro haproxy, que cogerá por el socket los sockets y luego matará al haproxy antiguo:
haproxy -D -f simple.config -sf $(cat ha.pid) -p ha.pid -x $PWD/ha.sock

Lo que hace el proceso es conectarse por el socket y enviar el comando "_getsockets" y luego mata el proceso (primero un pause y luego un soft stop).






# Stop
soft stop es enviandole un SIGUSR1
pkill -USR1 haproxy
