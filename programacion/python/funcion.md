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

Otra forma:
locals()["pepe"](123)



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

