https://inventwithpython.com/blog/2022/11/19/python-linter-comparison-2022-pylint-vs-pyflakes-vs-flake8-vs-autopep8-vs-bandit-vs-prospector-vs-pylama-vs-pyroma-vs-black-vs-mypy-vs-radon-vs-mccabe/
Comparación linters/checkers.

https://docs.astral.sh/ruff/
An extremely fast Python linter and code formatter, written in Rust.
ruff check .   # Lint all files in the current directory.
ruff format .  # Format all files in the current directory.

Correciones automáticas
ruff check . --fix
Correciones que pueden romper cosas
ruff check . --unsafe-fixes
ruff check . --unsafe-fixes --fix


# Voluptuous
https://pypi.python.org/pypi/voluptuous
Voluptuous, despite the name, is a Python data validation library. It is primarily intended for validating data coming into Python as JSON, YAML, etc.

Creamos un esquema que los datos deben cumplir.




# Validacion / comprobacion del codigo. Buen estilo
autopep8 automatically formats Python code to conform to the PEP 8 style guide
  autopep8 file.py | sponge reformated.py
  autopep8 --ignore E226,E24,W503,W690,E501 ...
    si no queremos que corrija lineas largas (y dejamos los default)

Herramientas para comprobar que el código es correcto
flake8  # nos chequea tambien fallos del codigo, tipo variables no definidas, imports no usados, etc
flake8 --ignore=E501
  ignorar lineas largas
pylint
pydocstyle


pip install flake8 pylint pydocstyle

Ejemplo de como usarlos: https://home-assistant.io/developers/development_testing/

El que usan en openstack (flake8 más instrucciones)
https://pypi.python.org/pypi/hacking


https://pycodestyle.readthedocs.io/en/latest/intro.html#configuration
pydocstyle, para meter configs, generar un fichero tox.ini y meter, ejemplo:
[pycodestyle]
count = False
ignore = E226,E302,E41
max-line-length = 160

Si queremos ignorar un fichero entero en flake8, poner al comienzo:
```
# flake8: noqa
```

Otras formas de ignorar errores:
https://flake8.pycqa.org/en/3.1.1/user/ignoring-errors.html


py3status usa
pytest-flake8
pytest
Ejecucción: py.test --flake8


Para usar con git:
https://houndci.com/
Hound comments on style violations in GitHub pull requests, allowing you and your team to better review and maintain a clean codebase.

En travis-ci tambien se pueden poner chequeos
