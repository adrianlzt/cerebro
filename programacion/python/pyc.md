http://effbot.org/pyfaq/how-do-i-create-a-pyc-file.htm

python -m compileall fichero.py


# Byte code

If you’re curious, you can look at the byte code using the dis module:

>>> def hello():
...     print "hello!"
...
>>> dis.dis(hello)
  2           0 LOAD_CONST               1 ('hello!')
              3 PRINT_ITEM
              4 PRINT_NEWLINE
              5 LOAD_CONST               0 (None)
              8 RETURN_VALUE
