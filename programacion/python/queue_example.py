# Implementada como ejercicio
class Queue(object):
    def __init__(self):
        self.enter = None
        self.exit = None
    
    def enqueue(self, d):
        n = Node(d)
        if not self.enter:
            self.enter = n
            self.exit = n
        else:
            self.enter.next = n
            self.enter = n
           

    def dequeue(self):
        if not self.exit:
            return None
        n = self.exit
        self.exit = self.exit.next
        if not self.exit:
            self.enter = None
        return n.data
    
queue = Queue()
assert(queue.dequeue() == None)
queue.enqueue(3)
assert(queue.dequeue() == 3)
assert(queue.dequeue() == None)
queue.enqueue(3)
queue.enqueue(3)
assert(queue.dequeue() == 3)
assert(queue.dequeue() == 3)
assert(queue.dequeue() == None)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(1)
assert(queue.dequeue() == 3)
assert(queue.dequeue() == 4)
assert(queue.dequeue() == 1)
assert(queue.dequeue() == None)
