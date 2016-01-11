https://docs.python.org/2/library/random.html

from random import random
random()
  numero entre 0 y 1

from random import randint
randint(0,10)
  numero entero entre 0 y 10



# Strings
import random
''.join(random.SystemRandom().choice(['1','2','a','b']) for _ in range(5))

Gnera strings de 5 caracters con la lista que le hemos pasado.



import string
import random
def id_generator(size=6, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
   return ''.join(random.choice(chars) for _ in range(size))

>>> id_generator()
'AmWgtB'
