https://docs.python.org/2/library/stdtypes.html#typesmapping
http://docs.python.org/2/tutorial/datastructures.html#dictionaries

Dict:
b = {'one': 1, 'two': 2, 'three': 3}
b.get('one')
b['one']

b.get('four','no existe')
  devuelve el valor de la key 'four', o, si no existe esa key, devolverá 'no existe'

b.has_key("cosa")
Mejor asi (en python3 no hay has_key):
"cosa" in b
"cosa" not in b


Añadir otro elemento:
b['key'] = value

'one' in b #Devuelve true si 'one' es key del diccionario

Borrar elemento:
del(b['key'])
Si tenemos un array podemos hacer:
for i in b['key']:
  del(i['borrar'])


>>> inventario={}
>>> inventario.update({"asd":2})
>>> inventario.update({"BBB":1111})
>>> inventario.update({"asd":3})
>>> inventario
{'BBB': 1111, 'asd': 3}



Loop sobre el diccionario
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.iteritems():
...     print k, v

Python3:
for k, v in knights.items():
    print(k,v)


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


# Comparar
>>> a = {"pepe":[1,2,3],"maria":[4,5,6]}
>>> b = {"maria":[4,5,6],"pepe":[1,2,3]}
>>> a==b
True


# List comprehensions
https://docs.python.org/2/tutorial/datastructures.html#list-comprehensions

>>> variable=[{'name':123},{'name':000,'pepe':2}]
>>> [x['name'] for x in variable]
[123, 0]


# Dict comprehensions (python3)
new_dict = {item['name']:item for item in data}


# Convertir array de dicts a dict
dict((key,d[key]) for d in data for key in d)


# Copia
nueva = vieja
nueva copia la referencia de vieja. Lo que hagamos en nueva afectará a vieja.

Para hacer una copia de los datos:

nueva = dict(vieja)

Otra forma:
from copy import copy
nueva = copy(vieja)



# Default value / Añadir un elemento si no existe
>>> data = {}
>>> data.setdefault("p3",[]).append({"t":1111})
>>> data
{'p3': [{'t': 1111}]}
>>> data.setdefault("p3",[]).append({"t":2222})
>>> data
{'p3': [{'t': 1111}, {'t': 2222}]}


# Obtener la key desde la value
mydict = {'george':16,'amber':19}
print mydict.keys()[mydict.values().index(16)] # Prints george

Or in Python 3.x:
mydict = {'george':16,'amber':19}
print(list(mydict.keys())[list(mydict.values()).index(16)]) # Prints george


# dict_values
list(d.values())[0]



# Comprobar que un diccionario tiene las claves que queremos
all(key in body for key in ('name', 'services'))

Esto chequeará que el diccionario "body" tiene las claves "name" y "services".
Devolverá True en ese caso.
Si tiene esas más otras -> True
Si le falta alguna -> False



# OrderedDicts
https://docs.python.org/3/library/collections.html#collections.OrderedDict

Diccionarios que recuerdan el orden de las keys


# Sort
Ordernar dos arrays de diccionarios usando una key determinada:
from operator import itemgetter
list_1, list_2 = [sorted(l, key=itemgetter('unique_id'))
                  for l in (list_1, list_2)]


Imprimir un dict con sus keys en orden
for key in sorted(mydict.iterkeys()):
    print("%s: %s" % (key, mydict[key]))
