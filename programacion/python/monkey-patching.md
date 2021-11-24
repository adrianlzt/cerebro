https://medium.com/@chipiga86/python-monkey-patching-like-a-boss-87d7ddb8098e

Modificar librerías de terceros


Hace falta tener la función "uncached": https://gist.github.com/schipiga/482de016fa749bc08c7b36cf5323fd1b/raw/787083c3c210b2e0557d7c3e161b93aef669dd1b/uncache.py

Ejemplo "parcheando" la lib ttp_sros_parser para que no compruebe que el parámetro es un fichero (al llamar a SrosParser, en el init llama a una función de helpers)

import ttp_sros_parser.helpers
ttp_sros_parser.helpers.check_file = lambda x: x
uncache(["ttp_sros_parser.helpers"])
from ttp_sros_parser.srosparser import SrosParser
SrosParser("CONFIG")
