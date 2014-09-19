https://docs.python.org/2/glossary.html#term-decorator
http://www.artima.com/weblogs/viewpost.jsp?thread=240808

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
