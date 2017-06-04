Queue esta pensando para permitir que diferentes threads se comuniquen mediante colas

Para una estructura de datos tipo queue o stack mirar collections.md deque

# FIFO
>>> from queue import Queue
>>> q = Queue()
>>> q.put(4)
>>> q.unfinished_tasks
1
>>> q.get()
4


# LIFO (stack)
from queue import LifoQueue

q.empty
 Return True if the queue is empty, False otherwise (not reliable!).


q.full
 Return True if the queue is full, False otherwise (not reliable!).  

q.qsize
