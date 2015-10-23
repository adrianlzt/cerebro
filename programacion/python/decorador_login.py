from functools import wraps
import time
import sys

def login_check(f):
    @wraps(f)
    def wrapper(*args, **kwargs):

        # Login es True si los segundos son pares
        # False si son impares
        login = ((int(time.time())%2)==0)

        if login:
            print("LOGIN OK: usuario permitido")
            return f(*args, **kwargs)
        else:
            sys.stderr.write("LOGIN ERROR: Necesitas ser administrador\n")
            sys.exit(1)
    return wrapper
