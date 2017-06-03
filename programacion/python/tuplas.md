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

>>> Point = namedtuple('Point', ['x', 'y'])
>>> p = Point(11, y=22)     # instantiate with positional or keyword arguments
>>> p[0] + p[1]             # indexable like the plain tuple (11, 22)
33
