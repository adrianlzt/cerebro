https://python-poetry.org/
Python packaging and dependency management made easy

Es como pipenv + setuptools.

Poetry gestiona dependencias, pero también la publicación del paquete, versionado, autores, etc.
Parece que es más rápido que pipenv.

# Iniciar un proyecto
poetry init

Creará el fichero pyproject.toml

poetry lock
Para generar el fichero poetry.lock

poetry install

poetry shell

poetry env remove python
Borrar el venv


# Virtualenvs
~/.cache/pypoetry/virtualenvs/

# Dependencias
poetry add requests
poetry add git+https://github.com/gburlet/YouTokenToMe.git@dependencies
poetry remove requests

## git
https://python-poetry.org/docs/dependency-specification#git-dependencies

## Organización de dependencias
Se pueden organizar en varios grupos: generales, dev, test, etc
https://python-poetry.org/docs/managing-dependencies/


# Migrar desde pipenv
https://pypi.org/project/pipenv-poetry-migrate/
