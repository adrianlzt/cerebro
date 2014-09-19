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

