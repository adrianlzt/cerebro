First of all, pudb is fantastic, just use it over pdb all the time.
q is for when you want to log data, pudb is for when you want to step through and evaluate lines in-context. It's very possible that you'll want to use both together.


Herramienta ncurses para debugear python PuDB

http://docs.python.org/2/library/pdb.html
http://www.doughellmann.com/PyMOTW/pdb/

# Interactivo tras fallo
python -i script.py
  tras fallar nos deja una traceback de donde ha parado y la consola abierta

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

 arrancamos el programa que necesita stdin:
   cat args | PYTHONPATH=. python ansible_module_*.py

En la primera terminal tendremos el pdb.



h(elp) [command]
w(here)
s(tep) # Se introduce en las funciones
n(ext) # Siguiente linea de mi funcion
c(ont(inue)) # Hasta el siguiente breakpoint
r(eturn) # until the current function returns
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
http://www.dalkescientific.com/writings/diary/archive/2005/04/20/tracing_python_code.html

Redirigir output a un fichero, puede generar ficheros muy grandes (con la CLI de ceph me generó un fichero de 27MB)
Con una prueba con yum me petaba

Meter este código:

import sys
import linecache

def traceit(frame, event, arg):
    if event == "line":
        lineno = frame.f_lineno
        filename = frame.f_globals["__file__"]
        if (filename.endswith(".pyc") or
            filename.endswith(".pyo")):
            filename = filename[:-1]
        name = frame.f_globals["__name__"]
        line = linecache.getline(filename, lineno)
        print "%s:%s: %s" % (filename, lineno, line.rstrip())
    return traceit

sys.settrace(traceit)
main()
