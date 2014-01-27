http://docs.python.org/2/tutorial/datastructures.html#dictionaries

Dict:
b = {'one': 1, 'two': 2, 'three': 3}
b.get('one')
b['one']

Añadir otro elemento:
b['key'] = value

'one' in b #Devuelve true si 'one' es key del diccionario


Loop sobre el diccionario
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.iteritems():
...     print k, v
