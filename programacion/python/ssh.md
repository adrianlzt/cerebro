http://code.activestate.com/recipes/533143-set-environment-variables-for-using-ssh-in-python-/
Para poder tener ssh-agent si queremos lanzar algo que haga uso de el.

El comando
keychain -Q -q --eval ....


# SSH desde python
http://www.paramiko.org/

import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('127.0.0.1', username='jesse', password='lol')

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

