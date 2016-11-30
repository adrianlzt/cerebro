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
http://sebastiandahlgren.se/2012/10/11/using-paramiko-to-send-ssh-commands/
No es trivial enviar un comando y recibir la respuesta.
