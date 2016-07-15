https://docs.python.org/2/library/sched.html


import time
from threading import Timer

def hola(msg):
    print(msg)

def tiempo():
    print "mensaje scheduled"
    Timer(2, hola, ["hola"]).start()

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





# Se queda escribiendo mensajes "Dos segundos" cada 2 segundos
from threading import Timer
import time

def timeout():
    print("Dos segundos")
    Timer(2, timeout).start()

Timer(2, timeout).start()

# do something else, such as
time.sleep(3)



# Detener
hilo = Timer(2, timeout)
hilo.cancel()

Podemos dejar t como una var global y hacer un s.cancel() cuando salgamos del programa

try:
    ...
except (KeyboardInterrupt, SystemExit):
    hilo.cancel()


