cadena="hola"
cadena[2]
'l'

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
BASE_URL_TEMPLATE = '{protocol}://{host}:{port}/api/{version}/'
BASE_URL_TEMPLATE.format(protocol=protocol, host=host, port=port, version=version)

Otra cosa útil es especificar el espacio que ocupa una string:
"{0:20} - {1:10}".format(var1,var2)

Da igual la lontigud de la cadena var1, con :20 lo que hacemos es que al menos ocupe 20 espacios:
>>> print("{0:20} texto".format("titulo"))
titulo               texto



## Comparación ##
http://stackoverflow.com/questions/9573244/most-elegant-way-to-check-if-the-string-is-empty-in-python

cmd = ''
if not cmd:
  print "cmd None o vacio'

## Replace
"hola".replace('o','a')
"hala"
