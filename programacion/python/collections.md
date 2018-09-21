https://docs.python.org/3/library/collections.html
https://docs.python.org/3.6/tutorial/datastructures.html#using-lists-as-queues

This module implements specialized container datatypes providing alternatives to Python’s general purpose built-in containers, dict, list, set, and tuple.

# deque
list-like container with fast appends and pops on either end
Si buscamos un método de comunicación entre threads mirar queue.md

Deque mejora a list en que las operaciones son aproximadamente O(1), mientras que list es costoso meter o sacar elementos del comienzo de la lista.

deque([])
 append X -> deque([X])
 append Y -> deque([X,Y])
 pop -> retorna Y, deque([X])
 appendleft Y -> deque([Y,X])
 popleft -> retorna Y, deque([X])

LIFO: append + pop (o appendleft + popleft)
FIFO: appendleft + pop (o append + popleft)

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



# Counter
import collections
a = [1,1,1,1,2,2,2,2,3,3,4,5,5]
counter=collections.Counter(a)
print(counter)
  Counter({1: 4, 2: 4, 3: 2, 5: 2, 4: 1})
print(counter.values())
  [4, 4, 2, 1, 2]
print(counter.keys())
  [1, 2, 3, 4, 5]
print(counter.most_common(3))
  [(1, 4), (2, 4), (3, 2)]
