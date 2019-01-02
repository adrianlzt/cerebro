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
time.localtime() va a devolvernos la hora teniendo en cuenta el TZ actual (variable de entorno TZ o /etc/localtime)
En una máquina CET time.localtime(0) nos devolverá el epoch+1h
En una máquina UTC time.localtime(0) nos devolverá el epoch 0



## con datetime
datetime -> epoch
datetime.datetime.now().strftime('%s')  # cuidado con este, en alpine funciona distinto (http://www.openwall.com/lists/musl/2018/01/18/3)
datetime.datetime.now().timestamp()  # en py3

epoch -> datetime
import datetime
import pytz
datetime.datetime.fromtimestamp(1284286794, pytz.utc)
print(datetime.datetime.fromtimestamp(1486398480, pytz.utc).strftime("%d/%m/%Y %H:%M:%S %z"))


from datetime import datetime
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
pip install python-dateutil
from dateutil import tz
datetime.datetime.now().replace(tzinfo=tz.gettz('Europe/Madrid')).astimezone(tz.gettz('UTC')).strftime('%Y-%m-%d %H:%M:%S.%f')

Como funciona el tema de los TZ en datetime es un poco raro.
Cuando le pedimos que haga strftime lo que va a hacer es buscar si tenemos algo referente al timezone (%z, %Z) y poner el valor.
Para parsear el resto de la fecha se hace con "time" (que no conoce de TZ).
Por lo tanto, si intentamos hacer un %s, perdemos la información de la TZ.

time va a entender que la hora que le pasemos (datetimoe.timetuple()) esta en la TZ de corra la maquina.


# Parsear fecha
>>> import datetime
>>> datetime.datetime.strptime("10/11/2015","%d/%m/%Y")
datetime.datetime(2015, 11, 10, 0, 0)

datetime.datetime.strptime("2008-09-03T20:56:35.450686Z", "%Y-%m-%dT%H:%M:%S.%fZ")


date --rfc-3339=seconds
datetime.datetime.strptime("2018-11-26 16:47:43+01:00", "%Y-%m-%d %H:%M:%S%z")



# Parsear rangos horarios
pip install osm-humanized-opening-hours

import humanized_opening_hours as hoh
field = "Mo-Fr 06:00-21:00; Sa,Su 07:00-21:00"
oh = hoh.OHParser(field)


https://raw.githubusercontent.com/rezemika/humanized_opening_hours/master/humanized_opening_hours/locales/fr_FR/LC_MESSAGES/hoh.pot<Paste>
>>> oh = hoh.OHParser("24/7", locale="es")
>>> print(oh.plaintext_week_description())
Lunes : 0:00–23:59
Martes : 0:00–23:59
Miércoles : 0:00–23:59
Jueves : 0:00–23:59
Viernes : 0:00–23:59
Sábado : 0:00–23:59
Domingo : 0:00–23:59

Pone que es hasta 23:59, pero en este caso es inclusivo (23:59:05 está dentro)
Si ponemos: "Mo 00:00-23:59", 23:59:01 no estará incluído

Si queremos poner las 24h lo haremos: 00:00-24:00

>>> oh.is_open(datetime.datetime.strptime("2019-01-02 23:59:43+01:00", "%Y-%m-%d %H:%M:%S%z"))
True

>>> oh = hoh.OHParser("Mo-Fr 08:00-18:00", locale="es")
>>> print(oh.plaintext_week_description())
Lunes: 8:00–18:00
Martes: 8:00–18:00
Miércoles: 8:00–18:00
Jueves: 8:00–18:00
Viernes: 8:00–18:00
Sábado: closed
Domingo: closed


Horario laboral:
"Mo-Fr 08:00-18:00; PH closed"

Horario no laboral:
"Mo-Fr 00:00-08:00,18:00-24:00; PH,Sa,Su 00:00-24:00"


Jugando con dias festivos:
>>> oh = hoh.OHParser("Mo-Fr 08:00-18:00; PH closed", locale="es")
>>> oh.PH_dates.append(datetime.date(2019,1,1))
>>> dt=datetime.datetime.strptime("2019-01-01 10:00:00", "%Y-%m-%d %H:%M:%S")
>>> oh.is_open(dt=dt)
False



# Festivos
https://github.com/dr-prodigy/python-holidays

Libreria para obtener los festivos de un pais, region, provincia

import holidays
madrid_festivos = holidays.CountryHoliday("ES", prov="MAD")
for h in madrid_festivos:
    print(h)

(datetime.date(2019, 1, 1), 'Año nuevo')
(datetime.date(2019, 1, 6), 'Epifanía del Señor')
...

Comparando con el calendario de http://www.calendarioslaborales.com/calendario-laboral-madrid-2019.htm veo algunas diferencias.
Por ejemplo, holidays pone el 19 de Marzo (San Jose), pero no es festivo (parece que es una excepción de 2019).
holidays tampoco tiene en cuenta movimiento de festivos 6-Enero -> 7-Enero y 8-Diciembre -> 9-Diciembre

Tampoco están los festivos locales de la ciudad de Madrid: 15 Mayo y 9 de Noviembre
