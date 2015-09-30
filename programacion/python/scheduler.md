https://docs.python.org/2/library/sched.html


import time
from threading import Timer

def hola():
    print "mensaje"

def tiempo():
    print "mensaje scheduled"
    Timer(2, hola, ()).start()

print "inicio programa"
tiempo()
time.sleep(5)
print "fin programa"




Escribe a los dos segundos, termina a los 5:
from threading import Timer
import time

def timeout():
    print("Dos segundos")

t = Timer(2, timeout)
t.start()

# do something else, such as
time.sleep(5)
