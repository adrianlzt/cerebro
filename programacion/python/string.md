mirar unidades.md para convertir 1000 a 1K

cadena="hola"
cadena[2]
'l'
cadena[2:4]
'la'


Para poder modificar:
a = list("hello")
a[2] = 'm'
print ''.join(a)


Funcionar como cut
'abcde:12345'.split(':')[1]

"bla ble bli".split()
["bla","ble","bli"]
"bla-ble-bli".split('-')[-1]
devuelve "bli"

platform.node().split('.', 1)[0]
te aseguras tener un elemento en el split y que no sale el keyError

Convertir string a int
int('233') / 3

A float
float('3.2')

# Chequear si es un numero
a="3"
a.isdigit()
True

a=u'3'
a.isnumeric()
True
a.isdecimal()
True

No vale para los float. Usar: http://stackoverflow.com/questions/736043/checking-if-a-string-can-be-converted-to-float-in-python
def isfloat(value):
  try:
    float(value)
    return True
  except ValueError:
    return False

## Convertir un caracter a su número unicode
>>> chr(65)
'A'
>>> ord("A")
65





Convertir a string
str(43)

string = "escapar caracter %% y aqui ponemos algo %s" % 4


String largo:
string = ''' aqui empieza
sigue por aqui
aqui termina'''

Lo malo de esta es que si esta tabulado el texto nos mete caracteres en blanco.


string = 'cosa\n'\
'mas cosas\n'\
'aqui termina'

string = (
    'Esto es una cadena muy larga\n'
    ' y asi es como se cambia de linea'
)

msn = (
   'priemra %s linea\n'
   'segunda linea %s'
   % (4,999)
)


# Concatenar
>>> print "hola"+" "+"pepe"
hola pepe

>>> hola="pepe"
>>> hola+="maria"
>>> hola
'pepemaria'


Meter variables en string estilo C
container_id = "%s_%s_%s_graph" % (sitename, host, service)


# String literals / Python3
https://docs.python.org/3/reference/lexical_analysis.html#formatted-string-literals
Meter variables directamente en una string

f"Mi nombre es {nombre} y mido {altura*100}cm"

f"""nombre: {nombre}
apellido: {apellido}"""

Escapar "{" o "}" con dobles:
a = f"ejemplo {{}}"


f"{nombre:>12}"
alineado a la derecha

f"{nombre:<12}"
alineado a la izquierda

>>> f'{pi:.2f}'
'3.14'


>>> "%0.2f" % 10
'10.00'




>>> import re
>>> host = "este.es.elnom.bre"
>>> print re.sub('\.', '_', host)
este_es_elnom_bre

## Uppercase ##
"asda".upper()

## Lowercase ##
>>> c="HOLAq Ue Aasd"
>>> c.lower()
'holaq ue aasd'

## Capital / Title ##
>>> "hola pepe".title()
'Hola Pepe'


## Quitar cambios de linea, espacios en blanco, etc ##
>>> s = " \n  abc   def   "
>>> s.strip()
'abc   def'
>>> s.rstrip()
' \n  abc   def'
>>> s.lstrip()
'abc   def   '

Funciona quitando los caracteres de la lista que le pasemos.
Si queremos quitar un prefijo:
def remove_prefix(text, prefix):
  if text.startswith(prefix):
    return text[len(prefix):]
  return text

def remove_postfix(text, postfix):
  if text.endswith(postfix):
    return text[0:len(text)-len(postfix)]
  return text



# Ver si una palabara esta en una cadena
'adri' in variable
True
>>> cadena = "--hola"
>>> "--" in cadena
True



>>> cadena
'--hola'
>>> cadena.lstrip('-')
'hola'


http://www.quora.com/Whats-the-difference-between-partition-and-split-for-strings-in-Python
>>> 'master-1.novalocal'.partition('.')[0]
'master-1'
partition devuelve una tupla



## Format ##
https://pyformat.info/


BASE_URL_TEMPLATE = '{protocol}://{host}:{port}/api/{version}/'
BASE_URL_TEMPLATE.format(protocol=protocol, host=host, port=port, version=version)

Otra cosa útil es especificar el espacio que ocupa una string:
"{0:20} - {1:10}".format(var1,var2)

Da igual la lontigud de la cadena var1, con :20 lo que hacemos es que al menos ocupe 20 espacios:
>>> print("{0:20} texto".format("titulo"))
titulo               texto


Si info es un "dict", usar directamente sus valores
print('{name} works at {status} {company}'.format_map(info))


{var:60.50}
Ocupa 60 espacios, pero la cadena muestra como mucho 50

{var:>60.50}
como antes pero identado a la derecha

'{:06.2f}'.format(3.141592653589793)
003.14



## Comparación ##
http://stackoverflow.com/questions/9573244/most-elegant-way-to-check-if-the-string-is-empty-in-python

cmd = ''
if not cmd:
  print "cmd None o vacio'

## Replace
"hola".replace('o','a')
"hala"

# Reverse
 p'hello world'[::-1]


# Binary string <-> string
>>> b'a string'.decode('utf-8')
'a string'

>>> 'a string'.encode('utf-8')
b'a string'



# Fuzzy search
http://chairnerd.seatgeek.com/fuzzywuzzy-fuzzy-string-matching-in-python/

Buscar cadenas parecidas
