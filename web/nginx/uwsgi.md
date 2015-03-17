http://uwsgi-docs.readthedocs.org/en/latest/Nginx.html

uwsgi es un programa aparte al que se conectará nginx
tambien es el protocolo de comunicación que se utilizará en la comunicación.

Mirar como configuro graphite con nginx


# Colas de sockets
Mirar network/unix_sockets.md

nginx no le gusta estar en la cola de RefCount.
Si la cola backlog está llena dará el error:
2015/03/05 13:14:52 [error] 1579#0: *51 connect() to unix:///var/run/uwsgi.sock failed (11: Resource temporarily unavailable) while connecting to upstream, client: 127.0.0.1, server: , request: "GET / HTTP/1.1", upstream: "uwsgi://unix:///var/run/uwsgi.sock:", host: "localhost:8002"




## Enseñanzas haciendo pruebas de carga a cyclops
uwsgi contenedor para apps python

uwsgi normalmente te arranca un proceso master y unos cuantos hijos. el master controlar la creación y destrucción de workers.
Tambien puede decirle a uwsgi poner un worker especial que implementa el http (opción de http).
4 workers con http te genera 6 procesos (master + http + 4*worker)

Mejor performance sustituir el http por nginx.
Como comunicar nginx con los workers uwsgi. Se conectar socket tcp o socket unix. 
Si comunicamos con socket tcp, por cada nueva conexión nginx-worker te abre un nuevo socket, y genera un montón de sockets en TIMEWAIT.

Mejor usar socket unix.
Nginx tiene que estar corriendo en la misma máquina que los workers.

Con uwsgi decides cuantos unix sockets creas.
El mapeo de sockets a workers lo decides a mano. Automaticamente todos los workers escuchan en todos los unix sockets.

Si mapeas 1:1, y se jode un worker, un socket se queda jodido, se queda jodido el socket.

Mejor tener el mismo numero de workers que unix sockets, mapeados todos con todos (lo que hace por defecto).

Crear 2xCPU número de workers.


uswgi --max-requests
  cada worker, tras x respuestas los reinicia. Cuidado, porque si estamos balanceando a todas por igual se van a reiniciar al mismo tiempo

uswgi --max-requests-delta
  le mete un delta a cada para que no se reinicien al mismo tiempo

--listen
  tamaño de la cola de escucha que va a usar uwsgi
  si subimos esto, subir el tamaño de la cola en el sistema operativa


Ejemplo:

upstream alarmer {
  least_conn;
  keepalive 32;
  server unix:///tmp/uwsgi.sock;
}

server {
  listen    8003;
  server_name cyclops.net;
  charset   utf-8;

  location /cyclops/v1/projects/ {
    uwsgi_pass alarmer;
    include uwsgi_params;
  }

}

