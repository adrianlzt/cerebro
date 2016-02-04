https://pypi.python.org/pypi/q

Dirty debugging

tail -f /tmp/q

# configurar

import q

# Imprimir valores
q(foo)
q("cosa")


# Tracear parametros y return value
@q
def funcion(pepe):
  return xx

# Consola interactiva en un punto del código
q.d()
