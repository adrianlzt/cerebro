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

locals() es para funciones locales (de la misma clase?)


Otra opción:
m = __import__ ('foo')
func = getattr(m,'bar')
func()
