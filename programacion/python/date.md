http://docs.python.org/2/library/datetime.html

>>> from datetime import date
>>> date.today()
datetime.date(2013, 11, 26)

>>> date.today().strftime("%Y-%m-%d")
'2013-11-26'


import time
int(time.time())
unix epoch


# medir tiempo
>>> import datetime
>>> a = datetime.datetime.now()
>>> b = datetime.datetime.now()
>>> c = b - a

>>> c
datetime.timedelta(0, 4, 316543)
>>> c.days
0
>>> c.seconds
4
>>> c.microseconds
316543
