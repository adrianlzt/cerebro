DEPRECATED en favor de systemd


http://upstart.ubuntu.com/cookbook

Nuevo sistema para levantar servicios


tareas del sistema en: /etc/init/
para el usuario en: $HOME/.init/
  para que funcione con usuarios hay que realizar pequeños cambios

Los comandos son:
initctl
start
stop


Ejemplo de fichero .conf para una app:

description "Example"
start on runlevel [2345]
stop on runlevel [!2345]
respawn
chdir /usr/local/share/rack/example
exec unicorn -c /etc/unicorn.conf.rb
