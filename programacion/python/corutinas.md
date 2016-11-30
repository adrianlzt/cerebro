http://dabeaz.com/coroutines/Coroutines.pdf
http://www.snarky.ca/how-the-heck-does-async-await-work-in-python-3-5 muy buena explicación
http://sahandsaba.com/understanding-asyncio-node-js-python-3-4.html Explicación de como funciona la asíncronía. Va poco a poco construyendo en python un programa que hace gestiona asincronia
Las corutinas pueden ser del tipo async (a partir de python3.5) o generator-based.
Para las de asyncio mirar asyncio.md
Aqui están las generator-based


A coroutine is a function that can "return" while still remembering the state in which it is returning (value of local variables, and what the next instruction should be). This will then allow the coroutine to be called again, which results in it continuing from where it left off. This form of "returning" is often called yielding.

Un uso es poder tener funciones a las que se les envien datos:
def grep(pattern):
  print "Looking for %s" % pattern
  while True:
     line = (yield)
     if pattern in line:
       print line,

g=grep("python")
Asi hemos creado la función, definido el pattern
g.next()
Ahora hemos avanzado hasta que la función encuentra "yield", donde se queda parada a la espera de un valor
g.send("pepe")
Ahora la función "grep" vuelve a arrancar desde donde se había quedado.



# Enviar valores
>>> def pepe():
...     yield "primero"
...     yield "segundo"
...     yield "tercero"
>>> for i in pepe():
...     print(i)
primero
segundo
tercero


>>> p = pepe()
>>> p
<generator object pepe at 0x7f524d717b48>
>>> next(p) # en python2 seria p.next()
'primero'


# Enviar un valor y quedar esperando a recibir otro
>>> def envrecv():
...     valor = yield "fuera"
...     print("Valor recibido es " + valor)
>>> imp = envrecv()
>>> next(imp)
'fuera'
>>> imp.send("123")
Valor recibido es 123
Traceback (most recent call last):
  File "<input>", line 1, in <module>
    imp.send("123")
StopIteration



# Yield drom
https://docs.python.org/3/whatsnew/3.3.html#pep-380

In summary, its best to think of yield from as a transparent two way channel between the caller and the sub-generator.

For simple iterators, yield from iterable is essentially just a shortened form of for item in iterable: yield item:
>>> def g(x):
...     yield from range(x, 0, -1)
