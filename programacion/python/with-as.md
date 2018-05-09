http://effbot.org/zone/python-with-statement.htm

class controlled_execution:
    def __enter__(self):
        set things up
        return thing
    def __exit__(self, type, value, traceback):
        tear things down

with controlled_execution() as thing:
     some code


Se suele usar para abrir ficheros:
with open(mtab_location, 'r') as mtab:
    lines = [line.strip('\n') for line in mtab.readlines()]

python2.7, 3.1:
with open("input", "r") as inp, open("output", "w") as out:
    out.write(inp.read())


https://stackoverflow.com/questions/45187286/how-do-i-write-a-null-no-op-contextmanager-in-python
A partir de python 3.7 podemos tener un context manager que no haga nada: nullcontext

Para versiones anteriores, si no usamos "as", podemos usar:
ctx_mgr = <meaningfulContextManager> if <condition> else contextlib.suppress()
with ctx_mgr:
    ....

import contextlib
with contextlib.suppress():
    ....
