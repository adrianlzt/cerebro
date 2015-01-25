uwsgi es un programa aparte al que se conectará nginx

Mirar como configuro graphite con nginx




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
