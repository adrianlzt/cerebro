https://www.freedesktop.org/software/systemd/man/systemd.socket.html

https://gist.github.com/kylemanna/d193aaa6b33a89f649524ad27ce47c4b
Ejemplo de un servidor en python que es arrancado para contestar una petición a un puerto.
Systemd es el que se encarga de escuchar en el puerto y levantar el proceso cuando se reciba alguna petición.

TimeoutStopSec=5
Esto en principio debería parar el servidor transcurridos 5" pero parece que hay un bug
https://github.com/systemd/systemd/issues/3912
