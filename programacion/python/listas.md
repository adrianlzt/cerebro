lista=['asda','2342','bbbb',11]
for l in lista:
	print l

Listas: http://docs.python.org/2/tutorial/datastructures.html
http://effbot.org/zone/python-list.htm
lista.pop #Saca 11 y lo elimina de la lista
lista.pop(0) #Saca 'asda' y lo elimina de la lista
len(lista) #Longitud de la lista
list.index(elemento) #Nos dice la posicion de un elemento
if valor in list # Nos vale para saber si un elemento esta en un array
lista[1] #Obtener el elemento que esta en esa posición de la lista


Generar lista: emails = [u.email for u in mailUsers]


http://docs.python.org/2/tutorial/datastructures.html#functional-programming-tools
Operaciones sobre listas: filter, map, reduce

  filter(func, sequence): devuelve una lista donde los objetos han hecho match
  map(func, seq1, seq2): hace operaciones con los elementos de las secuencias
  reduce(func,seq): hace operaciones sobre los dos primeros elementos, luego sobre el resultado y el siguiente elemento, etc


>>> def f(x): return x % 2 != 0 and x % 3 != 0
...
>>> filter(f, range(2, 25))
[5, 7, 11, 13, 17, 19, 23]


# list comprehension #
[f for f in milista if metodo(f)]

Me devuelve los elementos de mi lista que cumplan metodo(f)


# set - eliminar duplicados #
>>> a = [1,2,3,4,2,1,5]
>>> set(a)
set([1, 2, 3, 4, 5])

# interset - elementos en ambas listas #

