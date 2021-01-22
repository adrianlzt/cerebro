Convertir con distintos lenguajes:
https://www.epochconverter.com/#code


Convertir fecha unix timestamp a normal:
date --date @1012312312
date -d @1012312312

Fecha en timestamp con nanoseconds
date +%s.%N

Epoch milisegundos (puede que %N no esté implementado en todas las plataformas)
date +%s%3N



Convertir fecha a unix timestamp:
date -d "Wed, 6 Oct 2010 10:43:25 +0200" +"%s"

Es lo mismo que:
date -d "2010/10/6 10:43:25 +0200" +"%s"

Cuidado con meterle una fecha tipo "6/11/2016", por en españa es 6 de Noviembre, pero en US es 11 de Junio

$ LC_ALL=C date
Thu Oct  1 08:47:24 CEST 2015
$ LC_ALL=C date -d "Thu Oct  1 08:47:24 CEST 2015" +%s
1443682044


date -u "+%Y-%m-%dT%H:%M:%S.000Z"
2020-04-14T07:40:17.000Z



date +%F
YYYY-MM-DD

Mes del año sin cero delante:
date +%-m
6

Se puede poner más cosas:
- sin padding
_ padding con espacios
0 padding con ceros
^ uppercase
# downcase

date +%j
dia del año

Horas y minutos:
date +%H%M

Definir fecha:
date -s "Wed, 6 Oct 2010 10:43:25 +0200"
Tener cuidado con las locale (intentar pasar una fecha en español a un sistema en inglés)

date -s @1563346739


# Más resolución
$ date +%H:%M:%S.%N
13:30:29.930396926

$ date -Ins
2015-03-09T10:09:17,292535328+0100

$ date --rfc-3339=ns
2017-08-04 13:14:01.857964492+02:00


Poner la hora actual más una hora:
date -d '+1 hour' "+%d.%m.%Y %H:%M:%S"



Cambios de timezone:
Que hora es ahora en Chicago?
TZ=America/Chicago date

Que hora es en chicago cuando son las 11:00 en Madrid?
TZ=America/Chicago date -d "11:00 CEST"
TZ=America/Chicago date --date="TZ=\"Europe/Madrid\" 11:00"

Que hora es en mi zona horaria cuando son las 18:00 en Taipei
date --date='TZ="Asia/Taipei" 18:00'


