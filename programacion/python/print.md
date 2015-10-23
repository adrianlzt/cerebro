print ("Cruze por critical: %s" % crit_fecha if crit_fecha else "Sin cruze por critical")


Si new line al final:
http://stackoverflow.com/questions/493386/how-to-print-in-python-without-newline-or-space

import sys
sys.stdout.write('.')

# Python 2
print('.'),

# Python 3
print('.', end="")
print('.',end="",flush=True)
   Or if you are having trouble with the buffer
