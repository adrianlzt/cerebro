Otra opción distinta al módulo oficial: https://pypi.python.org/pypi/regex
pip install regex
import regex

http://docs.python.org/2/library/re.html
re — Regular expression operations

match tiene que matchear la linea entera, esto no encuentra nada: re.match("pepe (.*)","hola pepe mario")
search tiene que encontrar la regexp en alguna parte, esto si encuentra: re.search("pepe (.*)","hola pepe mario")
re.iterall nos devuelve un array con lo que ha encontrado, funcionando como search.

re.match('^[0-9]*$',"2342")
Devuelve un objeto _sre.SRE_Match si hace match, nada (None) si no.

re.findall(expr, string)
busca todas las coincidencias

Esto es como el grep, busca una linea:
re.search(".*coso.*", texto).group()


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
if re.match(re_garaje, frase):
  process()

Devuelve True si encuentra la regex en la frase

"(?i)cadena" para hacer match sin importar el "case"
(One or more letters from the set 'i', 'L', 'm', 's', 'u', 'x'.) The group matches the empty string; the letters set the corresponding flags: re.I (ignore case), re.L (locale dependent), re.M (multi-line), re.S (dot matches all), re.U (Unicode dependent), and re.X (verbose), for the entire regular expression


# Obtener valores
>>> import re
>>> cadena = "esta es la WO 34556 y aqui no"
>>> r = re.match(".*[Ww][Oo]\s*([0-9]+).*",cadena)
>>> r.group(0)
'esta es la WO 34556 y aqui no'
>>> r.group(1)
'34556'


# Multilinea
>>> texto = '''hola que tal time=1
... pepe time=2
... maria time=3 asda'''
>>> rrr = re.compile(r".*time=([0-9]+).*", re.MULTILINE)
>>> for r in rrr.finditer(a):
...   r.groups()


El punto (.) no matchea las newlines. Si queremos que lo haga tendremos que poner
re.MULTILINE|re.DOTALL

Si no, tendremos que pasar especificamente los newlines (cuidado con que nos pasen \n, \r o \r\n


# Verbose / regex con comentarios
```
a = re.compile(r"""\d +  # the integral part
                   \.    # the decimal point
                   \d *  # some fractional digits""", re.X)
```

# Debug
Display debug information about compiled expression
```
>>> re.match(r'[a-z]\s[0-9]', "a 9", flags=re.DEBUG)
IN
  RANGE (97, 122)
IN
  CATEGORY CATEGORY_SPACE
IN
  RANGE (48, 57)

 0. INFO 8 0b100 3 3 (to 9)
      in
 5.     RANGE 0x61 0x7a ('a'-'z')
 8.     FAILURE
 9: IN 5 (to 15)
11.   RANGE 0x61 0x7a ('a'-'z')
14.   FAILURE
15: IN 4 (to 20)
17.   CATEGORY UNI_SPACE
19.   FAILURE
20: IN 5 (to 26)
22.   RANGE 0x30 0x39 ('0'-'9')
25.   FAILURE
26: SUCCESS
<re.Match object; span=(0, 3), match='a 9'>
```


