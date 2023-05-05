>>> a = ()
>>> a += (1,)
>>> a += (2,)
>>> a += (3,)
>>> a
(1, 2, 3)



Array en tupla:
>>> tuple([1,2,3])
(1, 2, 3)



# Named tuples
https://docs.python.org/3/library/collections.html#collections.namedtuple
Es una tupla pero cada campo tiene un label asignado.

>>> import collections
>>> Point = collections.namedtuple('Point', ['x', 'y'])
>>> p = Point(11, y=22)     # instantiate with positional or keyword arguments
>>> p[0] + p[1]             # indexable like the plain tuple (11, 22)
33


>>> foo = collections.namedtuple('task_type', 'start end interval')
>>> x = foo(0, 10, 60)
>>> x.start
0
>>> x.end
10
>>> x.interval
60
