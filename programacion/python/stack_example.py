class Node(object):
    def __init__(self, d):
        self.data = d
        self.next = None
        
    def __repr__(self):
        return "Nodo %s" % self.data
    
    def __eq__(self, other):
        return self.data == other

class Stack(object):
    def __init__(self):
        self.top = None
    
    def pop(self):
        if not self.top:
            return None
        
        n = self.top
        self.top = self.top.next
        return n.data
    
    def push(self, d):
        n = Node(d)
        n.next = self.top
        self.top = n
    

stack = Stack()
assert(stack.pop() == None)
stack.push(3)
assert(stack.top == 3)
assert(stack.pop() == 3)
stack.push(3)
stack.push(4)
stack.push(8)
assert(stack.top == 8)
assert(stack.pop() == 8)
assert(stack.pop() == 4)
assert(stack.pop() == 3)
assert(stack.pop() == None)
