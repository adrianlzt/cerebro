def fun(*args, **kwargs)
  args son los argumentos
  **kwargs son los keyword arguments (estilo func(a=3))


func(*[1,2]) equivalente a func(1,2)


def nombre(self,param1,param2):
    """Resumen corto.
    
    Descripcion multilinea larga. Balblabla
    blablablablablal
    
    :param param1: Que es, param2: que es
    :returns: Explicación de lo que se devuelve
    """

    #logger.info("Que estamos haciendo %s", param1)

    ...

    return valor


# Return multiple values #

>>> def func():
...     a=1
...     b=2
...     return a,b
... 
>>> x,y = func()


# Llamar a una función cuyo nombre esta alamacendo en una string
http://stackoverflow.com/questions/3061/calling-a-function-of-a-module-from-a-string-with-the-functions-name-in-python

>>> def otra(x=0):
...   print "valor de x: " + str(x)
>>> globals()["otra"](1)
valor de x: 1
>>> eval("otra")(4)
valor de x: 4

locals() es para funciones locales (de la misma clase?)


Otra opción (fichero foo.py con clase o funcion 'bar'):
m = importlib.import_module('foo')
func = getattr(m,'bar')
func()

Si fuese una clase:
getattr(module,"Witai")()


Para llamar a una función si no tenemos clases
eval("nombreFunc")(params)

Otra forma (en bpython tengo que usar locals()):
globals()["pepe"](123)



Llamar a una func con un array (splash operator)
v = ["arg1","arg2"]
func(*v)

Llamar a una func con un dict
>>> def mifun(uno="1", dos="2"): print("uno " + uno + "   dos="+dos)
>>> mifun(**{"uno": "111", "dos":"dosdos"})
uno 111   dos=dosdos



Nombre de la funcion donde estamos:
import sys
def what_is_my_name():
    print(sys._getframe().f_code.co_name)



# Datos de una función
func.__name__

func.__module__
  donde esta definida

func.__defaults__
  valores por defecto de la funcion



# Hacer override de una función
Como llamar a funciones de una clase que no existen y generar las funciones dinámicamente
Este ejemplo lo que hace es printar a que función estamos llamando de la clase Prueba y devolver la función print.
Por lo que todas las llamadas a p.xxx(...) será como si hiciesemos print(...)

class Prueba:
    def _foo(self):
        """funcion que queremos poder llamar desde dentro de la clase"""
        pass
    def __getattr__(self, name):
        if name == "_foo":
            return self._foo
        print(f"has llamado a {name}")
        # Si queremos devolver un resultado podemos hacer algo tipo
        # return lambda x: results
        return print

p = Prueba()

p.mi_func("hola")




Algo similar pero pudiendo acceder a los parámetros:
from functools import partial

def bar(p1, p2):
    print(f"BAR: p1: {p1}, p2: {p2}")
    return "barfoo"


class Prueba:
    def _exec(self, name, *param):
        return globals()[name](*param)

    def __getattr__(self, name):
        if name == "_exec":
            return self._exec

        return partial(self._exec, name)


p = Prueba()
print(p.bar("p1", "p2"))

