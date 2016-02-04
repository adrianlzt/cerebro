lista=['asda','2342','bbbb',11]
for l in lista:
	print l

Listas: http://docs.python.org/2/tutorial/datastructures.html
http://effbot.org/zone/python-list.htm
lista.pop() #Saca 11 y lo elimina de la lista
lista.pop(0) #Saca 'asda' y lo elimina de la lista
len(lista) #Longitud de la lista
list.index(elemento) #Nos dice la posicion de la primera aparicion de 'elemento'
Salta excepción si no existe ese elemento:
try:
  b.index('23')
except ValueError as e:
  e


elemento in list # True or False
if valor in list # Nos vale para saber si un elemento esta en un array
lista[1] #Obtener el elemento que esta en esa posición de la lista
lista.append(elemento)  equivalent to a[len(a):] = [x]
lista.insert(0,'/') añade al comienzo del la lista. No sobreescribe, añade.
todo = lista1 + lista2 # concatenar dos listas

sorted(list)  devuelve una lista ordenada

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
range(start,start+step*n_elements,step)

Generar n elementos de step en step hasta llegar a stop (stop no será parte del array)
range(stop-n*step,stop,step)

Si queremos que stop sea parte del array:
range(stop-(n-1)*step,stop+1,step)

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
Listas inmutables.
Más pequeñas. Menos memoria
https://docs.python.org/2/library/stdtypes.html#set

Convertir array a set
set(array)

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
