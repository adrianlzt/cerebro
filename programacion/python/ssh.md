http://code.activestate.com/recipes/533143-set-environment-variables-for-using-ssh-in-python-/
Para poder tener ssh-agent si queremos lanzar algo que haga uso de el.

El comando
keychain -Q -q --eval ....


# SSH desde python
http://www.paramiko.org/

import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('127.0.0.1', username='jesse', password='lol', allow_agent=False, look_for_keys=False) # Si conectamos con pass tenemos que poner lo del allow_agent y el load_for_keys
stdin, stdout, stderr = ssh.exec_command('id')
print(stdout.readlines())

│ Authentication is attempted in the following order of priority:                                                      │
│                                                                                                                      │
│     - The ``pkey`` or ``key_filename`` passed in (if any)                                                            │
│     - Any key we can find through an SSH agent                                                                       │
│     - Any "id_rsa", "id_dsa" or "id_ecdsa" key discoverable in                                                       │
│       ``~/.ssh/``                                                                                                    │
│     - Plain username/password auth, if a password was given

Ejemplo
http://stackoverflow.com/questions/9470584/python-paramiko-run-command

#!/usr/bin/env python
hostname = '192.168.3.4'
port = 22
username = 'username'
password = 'mypassword'
y = "2012"
m = "02"
d = "27"

def do_it():
    s = paramiko.SSHClient()
    s.load_system_host_keys()
    s.connect(hostname, port, username, password)
    command = 'ls /home/user/images/cappi/03000/' + y + '/' + m + '/' + d
    (stdin, stdout, stderr) = s.exec_command(command)
    for line in stdout.readlines():
        print line
    s.close()

if __name__ == "main":
    do_it()



Si queremos tener tty (para sudo por ejemplo:
stdin, stdout, stderr = client.exec_command(command,  get_pty=True)


Si queremos una shell para enviar y recibir comandos (se pide automáticamente la pty):
chan = client.invoke_shell()
chan.sendall("comando\n")
chan.recv(9999)



Ejemplos: https://gist.github.com/rtomaszewski/3397251



# Ejemplo sin usar client (más bajo nivel)
import paramiko
t = paramiko.Transport(("10.0.0.2",22))
t.start_client()


t.auth_none("username")  # comprobar los allowed methods para hacer login

t.auth_interactive_dumb("username")  # usar keyboard-interactive

t.auth_password(username, password)  # usando user y password


# SCP
Con un channel que tiene pty e invoke_shell:
chan.sendall("scp -qt FICHERO\n")
chan.recv(512)  # debemos recibir \x00
chan.sendall("C0600 5 FICHERO\n")  # 0600 es el mode del fichero, 5 el tamaño en bytes
chan.recv(512)  # debemos recibir \x00
chan.sendall("12345")  # enviamos los 5 bytes prometidos
chan.sendall("\n\x00\n")
chan.recv(512)  # debemos recibir el siguiente prompt



# Más debug
import paramiko
import logging

logging.getLogger("paramiko").setLevel(logging.DEBUG)
logging.getLogger("paramiko.transport").setLevel(logging.DEBUG)
paramiko.util.log_to_file("paramiko.log")
...
transport.set_hexdump(True)


Los paquetes del hexdump contienen el paquete "interesante" más cabeceras del transport.
Ejemplo:
DEB [20180103-19:06:44.234] thr=2   paramiko.transport: OUT: 00 00 00 1C 0A 05 00 00 00 0C 73 73 68 2D 75 73    ..........ssh-us
DEB [20180103-19:06:44.234] thr=2   paramiko.transport: OUT: 65 72 61 75 74 68 00 00 00 00 00 00 00 00 00 00    erauth..........

La parte interesante de ahi es: 05 00 00 00 0C 73 73 68 2D 75 73 65 72 61 75 74 68
Siendo 05 el tipo de paquete (service-request)



# Errores
Intentando conectar con un server ssh de Cyberark/Cojure me estaba denegando el auth password.
Resulta que necesitaba que primero le enviase una petición de auth none y luego el auth password.
