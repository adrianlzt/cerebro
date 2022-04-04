Otro debbuger: https://github.com/rocky/python3-trepan/

mirar también py_inject.md, para inyectar código

https://github.com/P403n1x87/austin-tui
Una interfaz "top-like" para austin, que permite debugear en caliente

Saltar de pdb al intérprete con el contexto de variables
!import code
code.interact(local=locals())

si queremos saltar en una parte del código a un interprete bpython
import bpython; bpython.embed(locals_=locals())



# breakpoint
https://www.python.org/dev/peps/pep-0553/
A partir de python 3.7 podemos poner en el código:
breakpoint()

Será equivalente a poner:
import pdb; pdb.set_trace()

Si queremos ejecutar otro debugger haremos:
breakpoint()

Y lo ejecutaremos como:
PYTHONBREAKPOINT=epdb.st python test.py




First of all, pudb is fantastic, just use it over pdb all the time.
q is for when you want to log data, pudb is for when you want to step through and evaluate lines in-context. It's very possible that you'll want to use both together.


Herramienta ncurses para debugear python PuDB

http://docs.python.org/2/library/pdb.html
http://www.doughellmann.com/PyMOTW/pdb/

# Interactivo tras fallo
python -i script.py
  tras fallar nos deja una traceback de donde ha parado y la consola abierta
  en realidad -i lo que hace es ejecutar el codigo y luego abrirnos el terminal

Mirar pudb.md

Con bpython, poner al principio:
import bpdb
bpdb.set_trace()
  con 'B' se salta al bpython


Probar ejemplo debug-test.py

$ vi programa.py
$ python
>>> import pdb
>>> import programa
>>> pdb.run('simple.main()')
(Pdb) 

Otra forma, metiendo un punto de parada en el programa:
import pdb
pdb.set_trace()

Otra forma:
$ python -m pdb script.py


Cuando estamos pasando stdin al comando: http://stackoverflow.com/questions/17074177/how-to-debug-python-cli-that-takes-stdin
El truco es que pdb va a usar el stdin y stdout de los fifo que creamos.
En una terminal:
 mkfifo stdin
 mkfifo stdout
 cat stdout &
 cat > stdin

En otra terminal (en el mismo dir):
 modificamos el .py para meterle el set_trace() de la siguiente manera:
   import pdb
   mypdb=pdb.Pdb(stdin=open('stdin','r'), stdout=open('stdout','w'))
   pdb.set_trace=mydbp.set_trace
   pdb.set_trace()

 arrancamos el programa que necesita stdin:
   cat args | PYTHONPATH=. python ansible_module_*.py

En la primera terminal tendremos el pdb.



h(elp) [command]
w(here)
s(tep) # Se introduce en las funciones
n(ext) # Siguiente linea de mi funcion
c(ont(inue)) # Hasta el siguiente breakpoint
r(eturn) # until the current function returns
unt(il) # sigue ejecutando hasta que la ejecucción continue en una linea con un número superior a la actual (como next?)
b(reak) # [[filename:]lineno | function[, condition]]
	Sin parametros muestra los breakpoints y los numera
	b 5, i>4 # Para en la linea 5 solo si i vale mayor que 4
cl(ear) # [filename:lineno | bpnumber [bpnumber ...]]
	Con filename:lineno, borra todos los bp en esa linea
	Si es un numero, se refiere a la lista que saca break
!comando # ejecuta dicho comando
j(ump) lineno
l(ist) [first[, last]]
a(rgs) # Print the argument list of the current function.
p expression # Evaluate the expression in the current context and print its value
pp expression # Like the p command, except the value of the expression is pretty-printed using the pprint module
run / restart
q(uit)
whatis # nos dice el tipo de una variable
debug # recursive debugger (para que sirve?):w
!comando python # no es necesario poner la exclamación si el comando no se parece a ninguno de los de pdb, pero es más comodo por seguridad


Subir/bajar por el stack trace
up
down


# ePDB
remote debug
https://pypi.python.org/pypi/epdb/

Tambien me ha valido en algunos casos donde por usar multiprocessing pdb no me funcionaba

import epdb; epdb.st()

import epdb; epdb.serve(port=8080)
  entrar con:
  nc IP 8080



# Remote-pdb
pip install remote-pdb

from remote_pdb import RemotePdb
RemotePdb('127.0.0.1', 4444).set_trace()

nc 127.0.0.1 4444


## GDB ##
http://fedoraproject.org/wiki/Features/EasierPythonDebugging

http://stackoverflow.com/questions/7412708/debugging-stepping-through-python-script-using-gdb
Comentario 3. Larguísimo.

Para un running process:
yum install gdb python-debuginfo
gdb python <process id>

No se como meter la tabla de símbolos, así que no parece muy util


Parece que no existe una solución para debuggear un python en caliente: https://github.com/inducer/pudb/issues/31


# Sacar cada linea por la que pasa el programa
mirar tracing.md
