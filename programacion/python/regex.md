http://docs.python.org/2/library/re.html
re — Regular expression operations

re.match('^[0-9]*$',"2342")
Devuelve un objeto _sre.SRE_Match si hace match, nada (None) si no.


>>> import re
>>> host = "este.es.elnom.bre"
>>> print re.sub('\.', '_', host)
este_es_elnom_bre


var='blabla 52345 asdasd'
re.sub('.*([0-9]{5,6}).*',"\g<1>", var)
Nos devuelve solo el numero


# Matchea?
frase = "tenemos una bonita plaza de garaje"
re_garaje = '.*[gG]araje.*'
not re.match(re_garaje, frase) is None

Devuelve True si encuentra la regex en la frase


# Obtener valores
>>> import re
>>> cadena = "esta es la WO 34556 y aqui no"
>>> r = re.match(".*[Ww][Oo]\s*([0-9]+).*",cadena)
>>> r.group(0)
'esta es la WO 34556 y aqui no'
>>> r.group(1)
'34556'

