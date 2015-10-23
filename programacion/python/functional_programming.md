https://docs.python.org/2/tutorial/datastructures.html#functional-programming-tools

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


# Filter
filter(lambda x: 'NaN' not in x['v'], json_data['data']['row'])
devuelve solo las filas que no tengan 'NaN' entre los valores de su array de clave 'v' (mirar estructura de arriba)


# Reduce
numeros=[1,2,3,4]
reduce(lambda x,y: x+y, numeros)

Esto hace:
1+2=3
3+3=6
6+4=10
