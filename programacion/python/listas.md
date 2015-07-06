lista=['asda','2342','bbbb',11]
for l in lista:
	print l

Listas: http://docs.python.org/2/tutorial/datastructures.html
http://effbot.org/zone/python-list.htm
lista.pop() #Saca 11 y lo elimina de la lista
lista.pop(0) #Saca 'asda' y lo elimina de la lista
len(lista) #Longitud de la lista
list.index(elemento) #Nos dice la posicion de un elemento
elemento in list # True or False
if valor in list # Nos vale para saber si un elemento esta en un array
lista[1] #Obtener el elemento que esta en esa posición de la lista
lista.append(elemento)  equivalent to a[len(a):] = [x]

sorted(list)  devuelve una lista ordenada

>>> for i in range(0,len(a)):
...  print a[i]


# Condicional
lista = []
if not lista:
 print "lista vacia"



Generar lista: emails = [u.email for u in mailUsers]


http://docs.python.org/2/tutorial/datastructures.html#functional-programming-tools
Operaciones sobre listas: filter, map, reduce

  filter(func, sequence): devuelve una lista donde los objetos han hecho match
  map(func, seq1, seq2): hace operaciones con los elementos de las secuencias
  reduce(func,seq): hace operaciones sobre los dos primeros elementos, luego sobre el resultado y el siguiente elemento, etc
Mirar lambda para ver como meter inline esas func.

>>> def f(x): return x % 2 != 0 and x % 3 != 0
...
>>> filter(f, range(2, 25))
[5, 7, 11, 13, 17, 19, 23]


# list comprehension #
[f for f in milista if metodo(f)]

Me devuelve los elementos de mi lista que cumplan metodo(f)


## Sets
https://docs.python.org/2/library/stdtypes.html#set

# set - eliminar duplicados #
>>> a = [1,2,3,4,2,1,5]
>>> set(a)
set([1, 2, 3, 4, 5])

# interset - elementos en ambas listas #
>>> b1 = [1,2,3,4,5,9,11,15]
>>> b2 = [4,5,6,7,8]
>>> set(b1).intersection(b2)
set([4, 5])

# Elementos en b1 que no estan en b2
>>> b1 = [1,2,3,4,5,9,11,15]
>>> b2 = [4,5,6,7,8]
>>> set(b1).difference(b2)
set([1, 2, 3, 9, 11, 15])



# Devolver un array tras aplicar una funcion a otro array #
checks = ["file1","file2"]
checks_with_dir = ["/tmp/"+c for c in checks]
