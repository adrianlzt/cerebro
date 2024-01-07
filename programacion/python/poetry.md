https://python-poetry.org/
Python packaging and dependency management made easy

Es como pipenv + setuptools.

Poetry gestiona dependencias, pero también la publicación del paquete, versionado, autores, etc.
Parece que es más rápido que pipenv.
Podemos ver el arbol de dependencias, entendiendo por qué se instala cada una y que requiere.


# Iniciar un proyecto
poetry init

Creará el fichero pyproject.toml

poetry lock
Para generar el fichero poetry.lock

poetry install
crea el venv e instala las dependencias
Instala también el propio paquete que hemos creado.
Si solo queremos instalar las deps
poetry install --no-root

poetry shell

poetry env remove python
Borrar el venv

poetry list
ver los comandos


# Virtualenvs
~/.cache/pypoetry/virtualenvs/

Si queremos que el virtualenv esté en $PWD/.venv
poetry config --local virtualenvs.in-project true

Creará el fichero poetry.toml:
[virtualenvs]
in-project = true


Si queremos instalar los paquetes a nivel de SO (por ejemplo, al hacerlo en un contenedor de docker)
poetry config virtualenvs.create false


# Config
~/.config/pypoetry/config.toml


# Version de python
Para forzar las 3.10.x
```
[tool.poetry.dependencies]
python = "~3.10"
```


# Dependencias
poetry add requests
poetry add git+https://github.com/gburlet/YouTokenToMe.git@dependencies
poetry remove requests

poetry show --tree
    Arbol de dependencias
poetry show foo
    Info de una dependencia

## Versiones
https://python-poetry.org/docs/dependency-specification/

^1.2.3	>=1.2.3 <2.0.0
^1.2	>=1.2.0 <2.0.0
^1	    >=1.0.0 <2.0.0
^0.2.3	>=0.2.3 <0.3.0
^0.0.3	>=0.0.3 <0.0.4
^0.0	>=0.0.0 <0.1.0
^0	    >=0.0.0 <1.0.0

~1.2.3	>=1.2.3 <1.3.0
~1.2	>=1.2.0 <1.3.0
~1	    >=1.0.0 <2.0.0

*	    >=0.0.0
1.*	    >=1.0.0 <2.0.0
1.2.*	>=1.2.0 <1.3.0

## git
https://python-poetry.org/docs/dependency-specification#git-dependencies

## Organización de dependencias
Se pueden organizar en varios grupos: generales, dev, test, etc
https://python-poetry.org/docs/managing-dependencies/


# Migrar desde pipenv
https://pypi.org/project/pipenv-poetry-migrate/
