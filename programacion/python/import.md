# Carga dinámica
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

