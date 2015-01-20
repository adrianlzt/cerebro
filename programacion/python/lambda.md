http://www.secnetix.de/olli/Python/lambda_functions.hawk

anonymous functions (i.e. functions that are not bound to a name) at runtim

>>> def f (x): return x**2
... 
>>> print f(8)
64
>>> 
>>> g = lambda x: x**2
>>> 
>>> print g(8)
64


# Filtrando una lista:
>>> foo = [2, 18, 9, 22, 17, 24, 8, 12, 27]
>>> 
>>> print filter(lambda x: x % 3 == 0, foo)
[18, 9, 24, 12, 27]
