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

json.load(fd)

json.dump(data,fd,indent=1)
