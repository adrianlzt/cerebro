while str == 'abc':
	cmd = raw_input('Introduzca comando: ')

	# No existen los switch-case, así que se haría de esta manera
	if cmd == 'a':
		print "hola"
		break # Sale del bucle
	elif cmd == 'b':
		print "adios" + str(n)
	else:
		sys.exit() #previo import sys

lista=['asda','2342','bbbb',11]
for l in lista:
	print l

Con indices:
>>> cosas =  ["casa", "sillA", "mesa"]
>>> for i,v in enumerate(cosas):
...   print("indice: %s, valor: %s" % (i,v))
... 
indice: 0, valor: casa
indice: 1, valor: sillA
indice: 2, valor: mesa


for num in range(0,10):
  if num == 5:
    continue # pasa al siguiente loop
	print "numero: %d" % (num)

>>> for i in range(0,3):
...     print i
... 
0
1
2


# Inline
squares = [x**2 for x in range(10)]


# Bucle infinito
while True:
    time.sleep(1)


# List comprehensions
https://docs.python.org/2/tutorial/datastructures.html#list-comprehensions

>>> variable=[{'name':123},{'name':000,'pepe':2}]
>>> [x['name'] for x in variable]
[123, 0]


Obtener de un dict solo la clave filtrando por los valores
>>> [k for k,v in cuentas.iteritems() if v == "alias2"]
['alias2']





# Contador
>>> import itertools
>>> counter = itertools.count()
>>> next(counter)
0
>>> next(counter)
1



# Iteradores
Solo se pueden recorrer una vez https://stackoverflow.com/questions/19759247/listing-a-filter-object-twice-will-return-a-blank-list
>>> a = [1, 2, 3]
>>> b = iter(a)
>>> list(b)
[1, 2, 3]
>>> list(b)
[]

Los filter() con iteradores


# tqdm
Para mostrar un ncurses de cuanto lleva en porcentaje y cuando tarda por item y va a tardar en total
