http://docs.python.org/2/library/re.html
re — Regular expression operations¶

re.match('^[0-9]*$',"2342")
Devuelve un objeto _sre.SRE_Match si hace match, nada (None) si no.


>>> import re
>>> host = "este.es.elnom.bre"
>>> print re.sub('\.', '_', host)
este_es_elnom_bre

