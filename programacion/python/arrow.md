http://crsmithdev.com/arrow/

Arrow is a Python library that offers a sensible, human-friendly approach to creating, manipulating, formatting and converting dates, times, and timestamps.

>>> arrow.get(1367900664)
<Arrow [2013-05-07T04:24:24+00:00]>

>>> arrow.utcnow().timestamp
1367901495


>>> arrow.get('2013-05-11T21:23:58.970460+00:00')
<Arrow [2013-05-11T21:23:58.970460+00:00]>

>>> arrow.utcnow().format('YYYY-MM-DD HH:mm:ss ZZ')
'2013-05-11 13:23:58 -07:00'

arrow.now().to("Europe/Madrid")

>>> m.format(arrow.FORMAT_RFC3339)
'2021-08-26 07:03:04+00:00'


>>> arrow.utcnow().to('US/Pacific')
<Arrow [2013-05-11T13:23:58.970460-07:00]>


Convertir a datetime
>>> arrow.get("2021-08-26T06:51:55.803Z").datetime
datetime.datetime(2021, 8, 26, 6, 51, 55, 803000, tzinfo=tzutc())
