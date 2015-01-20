https://docs.python.org/2/library/stdtypes.html#typesmapping
http://docs.python.org/2/tutorial/datastructures.html#dictionaries

Dict:
b = {'one': 1, 'two': 2, 'three': 3}
b.get('one')
b['one']

b.get('four','no existe')
  devuelve el valor de la key 'four', o, si no existe esa key, devolverá 'no existe'

Añadir otro elemento:
b['key'] = value

'one' in b #Devuelve true si 'one' es key del diccionario

>>> inventario={}
>>> inventario.update({"asd":2})
>>> inventario.update({"BBB":1111})
>>> inventario
{'BBB': 1111, 'asd': 2}



Loop sobre el diccionario
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.iteritems():
...     print k, v

>>> cosa
{'--hola': 123, 'adios': 666}
>>> for k in cosa:
...   if k.__contains__('--'):
...     cosa[k.lstrip('-')] = cosa.pop(k)
>>> cosa
{'hola': 123, 'adios': 666}


# Filter
>>> var = {'--user': None, '--username': None, 'alarm-send': True, 'alarm-send-list': False, 'host-delete': False}
>>> {k: v for k, v in var.iteritems() if k[0] != '-' and v}
{'alarm-send': True}

>>> [k for k, v in var.iteritems() if k[0] != '-' and v]
['alarm-send']

>>> cmd = [k for k, v in var.iteritems() if k[0] != '-' and v][0]
>>> cmd
'alarm-send'

