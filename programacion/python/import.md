# En funciones
Si hacemos un import dentro de una función, este solo estará disponible dentro de esa función.

# Varios imports
from clase import (
            cosa1,
            cosa2)

# Intento de carga
try:
    import dns.resolver
    dnspython_available = True
except ImportError:
    dnspython_available = False

# Carga dinámica (py >= 2.7)
import importlib
pepe = importlib.import_module("sys")
pepe.path


# Peformance
https://wiki.python.org/moin/PythonSpeed/PerformanceTips#Import_Statement_Overhead

Forma de cargar un import solo cuando se necesario (en caso de que sea muy grande y consuma tiempo)

email = None

def parse_email():
    global email
    if email is None:
        import email

# En directorios
Si queremos separar en directorios, asegurarnos que dentro de los nuevos directorios existe un fichero __init__.py para permitir que este se meta en el package python.

# Ejemplo de clases
fichero.py
COSO=123
class Pepe(object):
  ...
class Juan(object):
  def __init__(self):
    ...
  def func(self):
    ...


otro.py
from fichero import COSO,Juan
juan = Juan()
juan.func()

