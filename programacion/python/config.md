Se puede gestionar de varias maneras.
Fichero yaml, json

Una sencilla es un fichero python


config.py
variable = "valor"
array = [1,2,3]
otro = [
  {"coso":3, "p":"vasa"},
  {"pepe":3}
]
dic = {"maria":6}


Donde queramos usarlo
main.py
import config
...
config.otro
