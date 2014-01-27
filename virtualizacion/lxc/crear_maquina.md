Crear el container (los ficheros, ejecutables, etc)
sudo lxc-create -t ubuntu -n nombreContainer -- --auth-key /home/adrian/.ssh/id_rsa.pub
  -t: template, uno de los que esten en /usr/share/lxc/templates/
  -n: nombre container
  Si queremos ver la ayuda del template ubuntu: lxc-create -t ubuntu -h

# The default user is 'ubuntu' with password 'ubuntu'!
# Use the 'sudo' command to run tasks as root in the container.

$ sudo lxc-ls --fancy
nombreContainer               STOPPED  -     -     NO         

Arranca la máquina 'daemonizada'
$ sudo lxc-start -d -n nombreContainer

$ sudo lxc-ls --fancy
nombreContainer               RUNNING  10.0.3.7  -     NO         

$ ssh ubuntu@10.0.3.7
Entramos directamente porque insertamos en la creación la clave pública (--auth-key)
