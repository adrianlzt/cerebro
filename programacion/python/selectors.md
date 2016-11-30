https://docs.python.org/3/library/selectors.html

This module allows high-level and efficient I/O multiplexing, built upon the select module primitives.

select se usa para consultar un file descriptor cuando esté listo.


Ejemplo, esperar al entrada de stdin de un usuario y cuando este lista hacer algo.



Selectors no me funciona en python3.5 en arch
% python -V; python -c "import selectors"
Python 3.5.2
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/usr/lib64/python3.5/selectors.py", line 290, in <module>
    class SelectSelector(_BaseSelectorImpl):
  File "/usr/lib64/python3.5/selectors.py", line 317, in SelectSelector
    _select = select.select
AttributeError: module 'select' has no attribute 'select'

