https://docs.python.org/3/library/typing.html
http://stackoverflow.com/questions/14379753/what-does-mean-in-python-function-definitions
https://kobzol.github.io/rust/python/2023/05/20/writing-python-like-its-rust.html
  ejemplos de como tipar "fuertemente"

cheatsheet: https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html


mirar pydantic para tipos definidos y validaciones

Ejemplo: https://github.com/home-assistant/home-assistant/blob/master/homeassistant/util/dt.py

Especificamos que tipo de dato es el parámetro y que tipo de dato devuelve

def greeting(name: str) -> str:
    return 'Hello ' + name

def foo(arg: int = 0) -> None:

age: int = 1

greeting.__annotations__
{'name': <class 'str'>, 'return': <class 'str'>}


Listas:
def get_devices() -> list[model.Device]:

Diccionarios:
dict[str, float]

Si devolvemos varias variables, es una tupla:
def foo() -> tuple[bool, str]:

Devolver uno u otro tipo:
from typing import Union
def foo(client_id: str) -> Union[list,bool]


# dataclasses
https://docs.python.org/3/library/dataclasses.html

Helpers para crear automáticamente el ``__init__()`` y ``__repr__()``
