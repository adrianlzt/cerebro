https://docs.python.org/3.6/tutorial/datastructures.html
https://docs.python.org/3.6/library/stdtypes.html?highlight=list#list

lista=['asda','2342','bbbb',11]
for l in lista:
	print l

Listas: http://docs.python.org/2/tutorial/datastructures.html
http://effbot.org/zone/python-list.htm
lista.pop() # saca y retorna el ultimo elemento de la lista
lista.pop(0) # saca y retorna el primer elemento de la lista (si vamos a trabajar con los primeros elementos mirar deque.md)
del a[0], borra el elemento, no retorna el valor (como hace pop)
del a[:4] borra un trozo del array
operator.itemgetter(0,2,3)("hola")
  obtener la posición 0 2 y 3 de una lista
a.remove("b") borra el elemento "b" de la lista
len(lista) #Longitud de la lista
list.index(elemento) #Nos dice la posicion de la primera aparicion de 'elemento'
Salta excepción si no existe ese elemento:
try:
  b.index('23')
except ValueError as e:
  e


elemento in list # True or False
if valor in list # Nos vale para saber si un elemento esta en un array, complejidad O(n) (mejor obtener un elemento de un dict)

lista[1] #Obtener el elemento que esta en esa posición de la lista
lista[1:] # Obtener los elementos del segundo hasta el final
lista[2:9] + lista[12:15]  # dos secciones
a[start:end:step] # start through not past end, by step
a[::-1]    # all items in the array, reversed
a[-3::-1]  # everything except the last two items, reversed
  https://stackoverflow.com/questions/509211/understanding-pythons-slice-notation

lista.append(elemento)  equivalent to a[len(a):] = [x]
lista.extend(otra_lista) añade los elementos de otra_lista a lista
lista.insert(0,'/') añade al comienzo del la lista. No sobreescribe, añade.
todo = lista1 + lista2 # concatenar dos listas

sorted(list)  devuelve una lista ordenada
[2,3,4].sort()
sorted(student_tuples, key=lambda student: student[2])
  ordenar una lista de diccionarios por el segundo elemento del dict
sorted(student_tuples, key=lambda student: student[2])

Tambien podemos darle la vuelta con:
lista.sort(reverse=True)
lista.sort(key=lambda x: x[2], reverse=True)

[1,2,3,4].reverse()

>>> list(reversed([1,2,3]))
[3, 2, 1]

>>> for i in range(0,len(a)):
...  print a[i]

# Generar array
>>> range(5)
[0, 1, 2, 3, 4]
>>> range(2,6)
[2, 3, 4, 5]
>>> range(1,10,3)
[1, 4, 7]

Generar teniendo start, step y numero de elementos:
```
range(start,start+step*n_elements,step)
```

Generar n elementos de step en step hasta llegar a stop (stop no será parte del array)
```
range(stop-n*step,stop,step)
```

Si queremos que stop sea parte del array:
```
range(stop-(n-1)*step,stop+1,step)
```

# Condicional
lista = []
if not lista:
 print "lista vacia"



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


# list comprehension
https://docs.python.org/2/tutorial/datastructures.html#list-comprehensions

[f for f in milista if metodo(f)]
[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[str(round(pi, i)) for i in range(1, 6)]
[[row[i] for row in matrix] for i in range(4)]
  transpone una matriz

Me devuelve los elementos de mi lista que cumplan metodo(f)


Generar lista: emails = [u.email for u in mailUsers]


>>> variable=[{'name':123},{'name':000,'pepe':2}]
>>> [x['name'] for x in variable]
[123, 0]


## Sets
Listas inmutables.
Más pequeñas. Menos memoria
https://docs.python.org/2/library/stdtypes.html#set

Si nos falla por "unhashable type"

Convertir array a set
set(array)

Set a array (lista):
list(someset)
CUIDADO! no lo tiene porque devolver ordenado, aunque el array inicial lo estuviese

Convertir dict a set:
set(dicc.items)
>>> set({"clave": "valor", "otro": 2}.items())
set([('clave', 'valor'), ('otro', 2)])
>>> set({"clave": "valor", "otro": 2})
set(['otro', 'clave'])


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


# Generar array de iguales elementos
>>> [3] * 5
[3, 3, 3, 3, 3]

# Imprimir array
>>> a
[1, 2, 3]
>>> ",".join(str(item) for item in a)
'1,2,3'


# Copia
nueva = vieja
nueva copia la referencia de vieja. Lo que hagamos en nueva afectará a vieja.

Para hacer una copia de los datos:

nueva = list(vieja)

Otra forma:
from copy import copy
nueva = copy(vieja)

NO FUNCIONA si dentro de la lista tenemos diccionarios
Tenedremos que usar:
import copy
new_list = copy.deepcopy(old_list)




# Buscar una cadena en un array de cadenas
some_list = ['abc-123', 'def-456', 'ghi-789', 'abc-456']
if any("abc" in s for s in some_list):

# Buscar si hay un elemento en un array de diccionarios
data = [
    {'site': 'Stackoverflow', 'id': 1},
    {'site': 'Superuser', 'id': 2},
    {'site': 'Serverfault', 'id': 3}
]

any(d['site'] == 'Superuser' for d in data)


# Extend / juntar dos arrays
>>> a=[1,2,3,4]
>>> b=[9,9]
>>> a.extend(b)
>>> a
[1, 2, 3, 4, 9, 9]



# Lista de integer a string y viceversa
map(str, [1,2,3])
map(int, ["1","2"])



# Heapq
http://stackoverflow.com/questions/19979518/what-is-pythons-heapq-module

Interesante si queremos siempre obtener el elemento más pequeño de una lista.
Este objeto nos asegura que al hacer pop obtendremos el más pequeño, pero no asegura que el resto de la lista esté ordenada

Heapq llamará a las funciones __eq__ y __lt__ para comparar los objetos y decidir su orden (por si queremos crear nosotros una clase y ordenarla según nuestro criterio. Ejemplo en http://www.snarky.ca/how-the-heck-does-async-await-work-in-python-3-5 "class Task:")

>>> from heapq import heappop,heappush
>>> lista = []
>>> heappush(lista, 10)
>>> heappush(lista, 14)
>>> heappush(lista, 17)
>>> heappush(lista, 5)
>>> lista
[5, 10, 17, 14]
>>> heappop(lista)
5
>>> heappop(lista)
10
>>> heappop(lista)
14
>>> heappop(lista)
17



Mergear dos listas
zip(listaA,listaB)
>>> list(zip([1,2,3,4], [10,20,30,40]))
[(1, 10), (2, 20), (3, 30), (4, 40)]


Mergear dejando el tamaño de la más larga:
from itertools import zip_longest
zip_longest(A,B)

a=[1,2,3]
b=[1,2,3,4,5,6]
from itertools import zip_longest
list(zip_longest(a,b))
[(1, 1), (2, 2), (3, 3), (None, 4), (None, 5), (None, 6)]



# Obtener elementos de n en n
https://docs.python.org/3/library/itertools.html#recipes

from itertools import zip_longest
def grouper(iterable, n, fillvalue=None):
    "Collect data into fixed-length chunks or blocks"
    # grouper('ABCDEFG', 3, 'x') --> ABC DEF Gxx"
    args = [iter(iterable)] * n
    return zip_longest(*args, fillvalue=fillvalue)

Para un array, pudiendo devolver el último con menos elementos
>>> def mygrouper(n, iterable):
...     args = [iter(iterable)] * n
...     return ([e for e in t if e != None] for t in itertools.zip_longest(*args))
...
>>> list(mygrouper(3, range(9)))
[[0, 1, 2], [3, 4, 5], [6, 7, 8]]
>>> list(mygrouper(3, range(10)))
[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]


# Aplanar / flat
itertools.chain.from_iterable([[1,2,3],[4,5,6]])
  devuelve un iterador
