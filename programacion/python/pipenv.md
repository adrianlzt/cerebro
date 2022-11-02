https://pipenv.pypa.io/en/latest/

https://www.kennethreitz.org/essays/announcing-pipenv

pip + virtualenv

En un directorio donde queremos un virtualenv:
pipenv shell
  nos creará un virtualenv en ~/.virtualenvs con el nombre del dir y un hash (ej.: mydir-d457g5)
  generará el ficheros Pipfile

pipenv --python 2.7
  para generarlo con python2.7

PIPENV_IGNORE_VIRTUALENVS=1 pipenv ...
  ignorar si ya tenemos cargado algún virtualenv y empezar uno de cero

export PIPENV_VENV_IN_PROJECT="enabled"
  para crear el virtualenv en un directorio .env en el mismo path que Pipfile

PIPENV_PIPFILE=/autodoc/Pipfile pipenv
  para forzar donde está el Pipfile, o como se llama el fichero

Según vayamos instalando con:
pipenv install
se irán agregando las dependencias al fichero Pipfile.lock
Ejemplo:
  pipenv install ansible==2.4.2

pipenv --site-packages shell
  usar paquetes del sistema

pipenv install --system
  instalar los paquetes en el python del sistema
  nos vale si queremos usar pipenv en docker

Instalar desde un repo de git:
pipenv install -e git+https://github.com/datadope-io/python-protobix.git@feature/sender_ns#egg=protobix

Si está en un subdir:
pipenv install -e 'git+https://github.com/skydive-project/skydive.git@master#subdirectory=contrib/python/api&egg=skydive-client'

Instalar un directorio local, las modificaciones que hagamos en ese dir afectaran a nuestra app:
pipenv install --editable ./gsmHat

pipenv sync
instalamos lo que diga el .lock (en vez de lo que diga el Pipenv)

Actualizar paquete:
pipenv install --selective-upgrade paquete

Para salir del venv C^d o exit

Si ejecutamos
pipenv shell
buscará un fichero Pipenv en este dir o superiores.

para borrar el virtualenv
pipenv --rm

# Scripts
https://pipenv.pypa.io/en/latest/advanced/#custom-script-shortcuts
```
[scripts]
echospam = "echo I am really a very silly example"
```

Para luego usarlo con
pipenv run echospam

Si pasámos parámetros se pasarán a lo que ejecutemos en "script"

# Limitaciones
La principal que encuentro respecto a virtualenvwrapper, es que para activar un virtualenv tenemos que estar en el directorio donde creamos el venv o en un subdirectorio.
