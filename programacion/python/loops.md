http://docs.python.org/2/tutorial/datastructures.html#looping-techniques

>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print i, v
Se puede cambiar el comienzo del index: enumerate([], start=1)
Por defecto empieza en 0


>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print 'What is your {0}?  It is {1}.'.format(q, a)


>>> for i in reversed(xrange(1,10,2)):
...     print i
En python 2 xrange un generador, range una lista.
En py3 range crea un generador tambien. xrange no existe
Para pasar a lista: list(range(3))


>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print f


>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.iteritems():
...     print k, v


>>> words = ['cat', 'window', 'defenestrate']
>>> for w in words[:]:  # Loop over a slice copy of the entire list.
...     if len(w) > 6:
...         words.insert(0, w)
