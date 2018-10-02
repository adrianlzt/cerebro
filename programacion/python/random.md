https://docs.python.org/2/library/random.html
Warning The pseudo-random generators of this module should not be used for security purposes. For security or cryptographic uses, see the secrets module.


from random import random
random()
  numero entre 0 y 1 (incluídos)

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


# Secrets
https://docs.python.org/3/library/secrets.html#module-secrets

import secrets
secrets.token_bytes(24)
b'wm\xe7\xd5\x14\x81XGd\x90\\H\xef\x01\x92\x9a|\xcbpb\x8d\xc6\xb4!'
