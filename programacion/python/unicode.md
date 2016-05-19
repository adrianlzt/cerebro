https://pythonhosted.org/kitchen/unicode-frustrations.html
https://pythonhosted.org/kitchen/unicode-frustrations.html

In python-2.x, there’s two types that deal with text.

str is for strings of bytes. These are very similar in nature to how strings are handled in C.
unicode is for strings of unicode code points.




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
