https://github.com/neoclide/coc-python

Por defecto usa Pylint como linter. Este parece que ejecuta el resto (creo)


Ignorar líneas muy largas (no me hace caso, se está ejecutando por otro lado)
Crear fichero tox.ini con
[pycodestyle]
ignore = E501           # Si queremos ignorar todos los errores de linea larga
max-line-length = 160   # Si queremos incrementar el tamaño máximo de línea
