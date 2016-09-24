http://code.activestate.com/recipes/533143-set-environment-variables-for-using-ssh-in-python-/
Para poder tener ssh-agent si queremos lanzar algo que haga uso de el.

El comando
keychain -Q -q --eval ....


# SSH desde python
http://www.paramiko.org/

import paramiko
ssh = paramiko.SSHClient()
ssh.connect('127.0.0.1', username='jesse', password='lol')
