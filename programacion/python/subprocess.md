Usar https://docs.python.org/3.2/library/subprocess.html
https://pypi.python.org/pypi/subprocess32/
Para usarlo en python2.7
pip install subprocess32

Backport of the subprocess module from Python 3.2/3.3 for use on 2.x.


subprocess.Popen
  ejecuta el programa en un nuevo proceso

from subprocess32 import Popen
with Popen(["ifconfig"], stdout=PIPE) as proc:
    log.write(proc.stdout.read())



Salida en tiempo real, va sacando cada línea según se va produciendo:
http://stackoverflow.com/questions/18421757/live-output-from-subprocess-command

from subprocess32 import Popen,PIPE
with Popen(["/tmp/script.sh"], stdout=PIPE) as proc:
  for line in iter(proc.stdout.readline, ''):
    print(line.rstrip()) #rstrip() para no pintar lineas en blanco



# VIEJO #
https://docs.python.org/2/library/subprocess.html#replacing-older-functions-with-the-subprocess-module

import subprocess
subprocess.call("ls")



from subprocess import Popen, PIPE

p = Popen(["ls", "-l", "file"], stdout=PIPE)
# Al ejecutar Popen se arranca el nuevo proceso en segundo plano

output = p.communicate()[0]
# Si pedimos el output antes de que termine el programa parara la ejecuccion hasta tener el valor

print(p.returncode)


# Mandar stderr a /dev/null
import os
from subprocess import Popen, PIPE

FNULL = open(os.devnull, 'w')
proc = Popen(["/home/adrian/dsn/platon/src/scripts/inventory.py"], stdout=PIPE, stderr=FNULL)

