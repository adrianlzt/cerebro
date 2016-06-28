Mejor usar msgpack.md

Mostrar bonito un fichero json (con los cambios de línea y tabulado):
cat example.json | python -m json.tool
python -m json.tool example.json 


http://docs.python.org/2/library/json.html
Trabajar con json:
>>> import json
>>> json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}])
'["foo", {"bar": ["baz", null, 1.0, 2]}]'

>>> json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')

Para parsear la información a objetos python, tenemos bastante trabajo manual, definido que es cada estructura.

>>> import json
>>> body = {}
>>> body["name"] = "pepe"
>>> body["services"] = [{"name":"check1","event":"dos"},{"name":"check2"}]
>>> json.dumps(body)
'{"services": [{"name": "check1", "event": "dos"}, {"name": "check2"}], "name": "pepe"}'


# Ficheros
Se pueden pasar directamente filedescriptors:

with open("fichero.json") as fd:
    data = json.load(fd)

with open("fichero.json", "w") as fd:
    json.dump(data,fd,indent=4)


# Serializar
## Serializar datetime.datetime
TypeError: datetime.datetime(2012, 8, 8, 21, 46, 24, 862000) is not JSON serializable

CUIDADO! Con fechas no UTC parece que no funciona tan bien

def default(obj):
    """Default JSON serializer."""
    import calendar, datetime

    if isinstance(obj, datetime.datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
        millis = int(
            calendar.timegm(obj.timetuple()) * 1000 +
            obj.microsecond / 1000
        )
        return millis
    raise TypeError('Not sure how to serialize %s' % (obj,))

json.dumps(datos, default=default)
Esto lo que hace es usar un serializador custom para convertir la fecha en un unix timestamp con milisegundos
