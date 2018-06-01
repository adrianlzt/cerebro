https://www.kennethreitz.org/essays/announcing-pipenv

pip + virtualenv

En un directorio donde queremos un virtualenv:
pipenv shell
  nos creará un virtualenv en ~/.virtualenvs con el nombre del dir y un hash (ej.: mydir-d457g5)
  generará el ficheros Pipfile

pipenv --python 2.7
  para generarlo con python2.7

Según vayamos instalando con:
pipenv install
se irán agregando las dependencias al fichero Pipfile.lock
Ejemplo:
  pipenv install ansible==2.4.2

Actualizar paquete:
pipenv install --selective-upgrade paquete

Para salir del venv C^d o exit

Si ejecutamos
pipenv shell
buscará un fichero Pipenv en este dir o superiores.

para borrar el virtualenv
pipenv --rm


# Limitaciones
La principal que encuentro respecto a virtualenvwrapper, es que para activar un virtualenv tenemos que estar en el directorio donde creamos el venv o en un subdirectorio.

