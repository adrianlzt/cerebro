https://docs.python.org/3/library/collections.html

This module implements specialized container datatypes providing alternatives to Python’s general purpose built-in containers, dict, list, set, and tuple.

# deque
list-like container with fast appends and pops on either end

>>> from collections import deque
>>> d = deque()
>>> d
deque([])
>>> d.append("primero")
>>> d.appendleft("segundo")
>>> d
deque(['segundo', 'primero'])
>>> d.popleft()
'segundo'
>>> d.pop()
'primero'

