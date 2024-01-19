Como usar el fichero __init__.py en los packages
https://www.reddit.com/r/Python/comments/1bbbwk/whats_your_opinion_on_what_to_include_in_init_py/

Opción 1: en blanco
Opción 2: importar todos tus módulos
Opción 3: importar funciones "públicas"

La opción 3 parece común:
https://github.com/falconry/falcon/blob/master/falcon/__init__.py
https://github.com/psycopg/psycopg/blob/master/psycopg/psycopg/__init__.py
