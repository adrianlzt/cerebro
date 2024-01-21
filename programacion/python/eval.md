Permite convertir cadenas de texto en estructuras python
>>> x = eval('{ "tools" : { "master-1" : [ "cpu", "calltrace" ] } }')
>>> x['tools']['master-1']
['cpu', 'calltrace']


eval(): It evaluate a string which contains single expression and return the calculated value
exec(): It execute a string which contains one or more expression or statements. It always returns None.
  podemos definir variables que estarán luego accesibles


https://restrictedpython.readthedocs.io/en/latest/
RestrictedPython is a tool that helps to define a subset of the Python language which allows to provide a program input into a trusted environment. RestrictedPython is not a sandbox system or a secured environment, but it helps to define a trusted environment and execute untrusted code inside of it.
