First of all, pudb is fantastic, just use it over pdb all the time.
q is for when you want to log data, pudb is for when you want to step through and evaluate lines in-context. It's very possible that you'll want to use both together.


Herramienta ncurses para debugear python PuDB

http://docs.python.org/2/library/pdb.html
http://www.doughellmann.com/PyMOTW/pdb/

# Interactivo tras fallo
python -i script.py
  tras fallar nos deja una traceback de donde ha parado y la consola abierta

Mirar pudb.md

Probar ejemplo debug-test.py

$ vi programa.py
$ python
>>> import pdb
>>> import programa
>>> pdb.run('simple.main()')
(Pdb) 

Otra forma:
$ python -m pdb script.py

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
