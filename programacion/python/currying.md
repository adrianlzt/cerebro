https://mtomassoli.wordpress.com/2012/03/18/currying-in-python/

Parece que es una forma de poder hacer:
f(1)(2)(3)

Es decir, llamo a f(1).
Esto me retorna una función a la que le paso el parámetro 2
Que me devuelve una función a la que le paso el parámetro 3



En python parece que lo más parecido es partial de functools:

>>> from functools import partial
>>> def mifun(uno, dos):
...     print("funcncion. Para1:" + uno + ". Para2:" + dos)
>>> p=partial(mifun, "uno", "dos")
>>> p()
funcncion. Para1:uno. Para2:dos

