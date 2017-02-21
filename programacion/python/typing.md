https://docs.python.org/3/library/typing.html
http://stackoverflow.com/questions/14379753/what-does-mean-in-python-function-definitions

Ejemplo: https://github.com/home-assistant/home-assistant/blob/master/homeassistant/util/dt.py

Especificamos que tipo de dato es el parámetro y que tipo de dato devuelve

def greeting(name: str) -> str:
    return 'Hello ' + name

greeting.__annotations__
{'name': <class 'str'>, 'return': <class 'str'>}

