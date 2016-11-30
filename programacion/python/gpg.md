https://pypi.python.org/pypi/python-gnupg
http://pythonhosted.org/python-gnupg/


# Version desactualizada
pip install python-gnupg
no funciona con bpython

El pinentry tty no funciona

import gnupg
import os
os.putenv("PINENTRY_USER_DATA", "gnome3")
gpg = gnupg.GPG(use_agent=True)
x=gpg.decrypt_file(file("password.gpg", "rb"))
str(x)


# Version nueva NO FONA
https://github.com/isislovecruft/python-gnupg
pip install gnupg

No me funciona

import gnupg
gpg = gnupg.GPG(use_agent=True)
x = gpg.decrypt_file(file("file.gpg", "rb"))
str(x)


Mostrar errores
gpg = gnupg.GPG(use_agent=True, verbose=True)
