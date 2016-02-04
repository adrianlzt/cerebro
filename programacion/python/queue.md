>>> from queue import Queue
>>> q = Queue()
>>> q.put(4)
>>> q.unfinished_tasks
1
>>> q.get()
4


q.empty
 Return True if the queue is empty, False otherwise (not reliable!).


q.full
 Return True if the queue is full, False otherwise (not reliable!).  

q.qsize
