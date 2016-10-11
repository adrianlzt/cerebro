Permite convertir cadenas de texto en estructuras python
>>> x = eval('{ "tools" : { "master-1" : [ "cpu", "calltrace" ] } }')
>>> x['tools']['master-1']
['cpu', 'calltrace']

