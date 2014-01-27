https://python-guide.readthedocs.org/en/latest/writing/structure/

Project/
|-- bin/
|   |-- project
|
|-- project/
|   |-- test/
|   |   |-- __init__.py
|   |   |-- test_main.py
|   |   
|   |-- __init__.py
|   |-- main.py
|
|-- setup.py
|-- README


Si creamos un __init__.py dentro de un directorio, hacemos que ese directorio funcione como un "paquete". Ya podemos importarlo.


main.py:

import blabla
from blabla import bbb

var = 1
var = 2

def main():
	inicia()
	printf "cosa"
	...

...

if __name__ == '__main__':
	main()
