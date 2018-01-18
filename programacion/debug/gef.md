https://github.com/hugsy/gef
https://gef.readthedocs.io/en/latest/

# Install
wget -q -O- https://github.com/hugsy/gef/raw/master/gef.sh | /bin/sh
Copia un .py en .gdbinit (hace backup si ya había uno)

Con arch (falla la instalacion del paquete):
yaourt -S gef-git

Usar junto con voltron:
source /home/adrian/.gdbinit-gef.py
source /usr/lib/python3.6/site-packages/voltron/entry.py



# Uso
Arrancamos gdb y se cargará automaticamente.

Al arrancarlo puede que nos diga que nos faltan algunos comandos porque no tenemos ciertos paquetes de python.
Parece que tenemos que instalarlos a nivel de SO.
Algunos de ellos:
pip install retdec-python keystone-engine unicorn capstone ropper
