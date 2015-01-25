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

