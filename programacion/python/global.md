Si vamos a accederlas no hace falta declarar antes que es global. Si no la encuentra localmente cogerá la global.
Si vamos a editarla, es necesario declararla antes, si no, generará una nueva variable local



email = None

def parse_email():
    global email
    if email is None:
        email = "pepe@pepe.com"

def print_email():
    print(email)
