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
