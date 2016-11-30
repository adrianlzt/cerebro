Mirar arrow.md
Librería para gestionar de forma sencilla las fechas





http://docs.python.org/2/library/datetime.html

>>> from datetime import date
>>> date.today()
datetime.date(2013, 11, 26)

>>> date.today().strftime("%Y-%m-%d")
'2013-11-26'


# Unix epoch

## con time
time -> epoch
import time
int(time.time())

epoch -> time
time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(1347517370))


## con datetime
datetime -> epoch
datetime.datetime.now().strftime('%s')

epoch -> datetime
datetime.datetime.fromtimestamp(1284286794)


>>> print(datetime.now().strftime("%H:%M:%S"))
17:08:51

# medir tiempo
mirar time_measure.py para ver como medir el tiempo usado por una función mediante decoradores

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


>>> c=datetime.timedelta(days=2, hours=4, minutes=22, seconds=45,  microseconds=237432)
>>> str(c)
'2 days, 4:22:45.237432'


# Hora dentro de 10 minutos
now = datetime.datetime.now()
now_plus_10 = now + datetime.timedelta(minutes = 10)
now_plus_10.strftime('%s')


# Miliseconds
int((datetime.datetime.utcnow() - datetime.datetime(1970, 1, 1)).total_seconds() * 1000)
1448563403750


# Time zones
Convertir mi hora local de Madrid en UTC:
from dateutil import tz
datetime.datetime.now().replace(tzinfo=tz.gettz('Europe/Madrid')).astimezone(tz.gettz('UTC')).strftime('%Y-%m-%d %H:%M:%S.%f')

# Parsear fecha
>>> import datetime
>>> datetime.datetime.strptime("10/11/2015","%d/%m/%Y")
datetime.datetime(2015, 11, 10, 0, 0)

