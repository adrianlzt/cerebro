https://docs.python.org/2/tutorial/datastructures.html#functional-programming-tools

# Map
values = map(lambda x: x['v'][2], rrd_data['data']['row'])

Nos devuelve solo la columna 2 de cada estructura -> [3,6,9]

rrd_data : {
  data : {
    row : [
      {'t': 1, 'v': [1,2,3]},
      {'t': 2, 'v': [4,5,6]},
      {'t': 3, 'v': [7,8,9]}
    ]
  }
}


Obtener la key del diccionario que contiene un valor:
>>> a = {'a': [1, 2], 'b': [3, 6], 'c': [5, 6, 7]}
>>> num=2
>>> "".join(map(lambda k: k if num in a[k] else '', a))
'a'
>>> num=6
>>> "".join(map(lambda k: k if num in a[k] else '', a))
'cb'
>>> num=9
>>> "".join(map(lambda k: k if num in a[k] else '', a))
''

# Filter
filter(lambda x: 'NaN' not in x['v'], json_data['data']['row'])
devuelve solo las filas que no tengan 'NaN' entre los valores de su array de clave 'v' (mirar estructura de arriba)

Para devolver una lista:
list(filter(lambda x: ..., array))


# Reduce
numeros=[1,2,3,4]
reduce(lambda x,y: x+y, numeros)
  x es el iterador
  y es el resultado de la funcion

Esto hace:
1+2=3
3+3=6
6+4=10
