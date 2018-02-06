http://crysol.org/es/node/454
https://pythonhosted.org/kitchen/unicode-frustrations.html
https://pythonhosted.org/kitchen/unicode-frustrations.html

In python-2.x, there’s two types that deal with text.

str is for strings of bytes. These are very similar in nature to how strings are handled in C.
unicode is for strings of unicode code points.


Convertir unicode a str, convirtiendo los símbolos raros (á, é, ñ, etc) en valores ascii
import unicodedata
unicodedata.normalize('NFKD', u"áéÍÓñ").encode('ascii','ignore')
'aeIOn'



>>> "hóla".decode("ascii")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
UnicodeDecodeError: 'ascii' codec can't decode byte 0xc3 in position 1: ordinal not in range(128)


Podemos hacer que si encuentra un caracter raro se lo salte:
https://docs.python.org/2.7/library/codecs.html#codec-base-classes

>>> "ñasdás".decode("ascii", "ignore")
u'asds'



Encoding from unicode to str.

>>> u"a".encode("utf-8")
'a'
>>> u"\u0411".encode("utf-8")
'\xd0\x91'


Decoding from str to unicode.

>>> "a".decode("utf-8")
u'a'


En python2:
>>> len("ñ")
2
>>> len(u"ñ")
1


# Errores
UnicodeDecodeError: 'ascii' codec can't decode byte 0xe2 in position 20: ordinal not in range(128)

Es posible que estamos haciendo algo tipo:
"cosa: %s" % valor
siendo valor unicode

Se arregla con:
u"cosa: %s" % valor
