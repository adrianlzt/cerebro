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



>>> print "hola"+" "+"pepe"
hola pepe

Meter variables en string estilo C
container_id = "%s_%s_%s_graph" % (sitename, host, service)


>>> import re
>>> host = "este.es.elnom.bre"
>>> print re.sub('\.', '_', host)
este_es_elnom_bre


## Lowercase ##
>>> c="HOLAq Ue Aasd"
>>> c.lower()
'holaq ue aasd'


## Quitar cambios de linea, espacios en blanco, etc ##
>>> s = " \n  abc   def   "
>>> s.strip()
'abc   def'
>>> s.rstrip()
' \n  abc   def'
>>> s.lstrip()
'abc   def   '


>>> cadena = "--hola"
>>> cadena.__contains__('--')
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


## Comparación ##
http://stackoverflow.com/questions/9573244/most-elegant-way-to-check-if-the-string-is-empty-in-python

cmd = ''
if not cmd:
  print "cmd None o vacio'
