https://python-poetry.org/
Python packaging and dependency management made easy

Es como pipenv + setuptools.

Poetry gestiona dependencias, pero también la publicación del paquete, versionado, autores, etc.
Parece que es más rápido que pipenv.
Podemos ver el arbol de dependencias, entendiendo por qué se instala cada una y que requiere.

Parece que la resolución de dependencias puede cambiar bastante respecto a pipenv.

# Iniciar un proyecto
poetry init

Creará el fichero pyproject.toml

poetry lock
Para generar el fichero poetry.lock
Si queremos ver más detalle poner -vvv

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
  nos meterá la última dependencia con "^", para que en el pyproject quede registrada que vesión y no suba una major.

poetry add --group=dev ruff

poetry add nemo --extras=asr
  pasar que extras queremos instalar

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


# Docker
https://medium.com/@albertazzir/blazing-fast-python-docker-builds-with-poetry-a78a66f5aed0
```
FROM python:3.11-buster as builder

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root

FROM python:3.11-slim-buster as runtime

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}

COPY annapurna ./annapurna

ENTRYPOINT ["python", "-m", "annapurna.main"]
```

# Errores

## No coje las dependencias de git
https://github.com/python-poetry/poetry/issues/8774

Si un proyecto define sus dependencias en setup.py con un list comprehension, como aquí:
https://github.com/m-bain/whisperX/blob/v3.1.1/setup.py
install_requires=[
    str(r)
    for r in pkg_resources.parse_requirements(
        open(os.path.join(os.path.dirname(__file__), "requirements.txt"))
    )
]

Pipenv no es capaz de leerlo y falla.
