>>> type([1,2])
<type 'list'>


atributos, metodos, etc de una variable:
dir(nombre)


Comprobar si una variable esta definida:
if 'myVar' in locals():
  # myVar exists.
if 'myVar' in globals():
  # myVar exists.


>>> isinstance([1,2],list)
True

>>> int.__bases__
(<type 'object'>,)
>>> list.__bases__
(<type 'object'>,)



# Identificador - id
https://docs.python.org/2/library/functions.html#id

>>> a = [1,2,3]
>>> b=a
>>> id(a)==id(b)
True
>>> c = [1,2,3]
>>> id(a)==id(c)
False



Parametros de una función:
http://stackoverflow.com/questions/582056/getting-list-of-parameter-names-inside-python-function
>>> func = lambda x, y: (x, y)
>>> 
>>> func.__code__.co_argcount
2
>>> func.__code__.co_varnames
('x', 'y')
>>>
>>> def func2(x,y=3):
...  print(func2.__code__.co_varnames)
...  pass # Other things
... 
>>> func2(3,3)
('x', 'y')
>>> 
>>> func2.__defaults__
(3,)





class Config(object):

    def __init__(self):
        self.dict = {"clave": "valor"}

    def __getattribute__(self, name):
        """para usar como objecto.nombre
        Se llama antes que incluso a los propios parametros de la clase
        Intentar evitar su uso
        """
        return self.dict[name]

    def __getattr__(self, name):
        """para usar como objecto.nombre"""
        return self.dict[name]

    def __getitem__(self, name):
        """para usar como objecto['nombre']"""
        return self.dict[name]

    def __str__(self):
        return "hola"

    def funcion(self):
        return "blabla"

config = Config()
print config.clave
  # "valor"
print config
  # "hola"
  

var = "funcion"
getattr(config,var)
equivalente a
config.funcion



Objeto a diccionario:
vars(objecto)
Es equivalente a: objeto.__dict__
