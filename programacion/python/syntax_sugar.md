https://github.com/czheo/syntax_sugar_python

Añade nueva sintaxis a python

Python 3.6.0

pipe(10) | range | each(lambda x: x ** 2) | print

pipe(10) | [print]   # print run in a thread
pipe(10) | t[print]  # print run in a thread
pipe(10) | p[print]  # print run in a process
