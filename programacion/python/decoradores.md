https://docs.python.org/2/glossary.html#term-decorator
http://www.artima.com/weblogs/viewpost.jsp?thread=240808

Libreria de decoradores: https://wiki.python.org/moin/PythonDecoratorLibrary

https://news.ycombinator.com/item?id=16084238
how to abuse decorators


Decorators are applied once, at function definition time.
Annotating a function definition x with a decorator @d is equivalent to defining x, then, immediately afterward, having x = d(x).
Decorating a function with @d and @e, in that order, is equivalent to performing x = d(e(x)) after the function's definition.
No tienen porque retornar una función


Con los decorades tenemos ciertas limitaciones.
Para estos casos mirar functools.md wrappers

Ejemplo simple:
decorador_simple.py

Mirar ejemplo de una función decoradora para comprobar un login:
decorador_app.py
decorador_login.py

# Notas
el problema aquí es que la decoración es en import time
y la ejecución en run time
tu decoras la función de la clase cuando aún es unbounded
de ahí que si lo haces en el init te funcione
porque ahí ya es bounded



@staticmethod
def f(...):
    ...



@f1(arg)
@f2
def func(): pass
is equivalent to:

def func(): pass
func = f1(arg)(f2(func))





Decorando con una función custom:
def decorador(f):
    def r():
        return_f = f()
        print "DECORADOR: " + return_f
    return r

@decorador
def texto():
    return "funcion texto"

texto()

Devuelve: "DECORADOR: funcion texto"
