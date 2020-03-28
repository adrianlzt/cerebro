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


py3status usa
pytest-flake8
pytest
Ejecucción: py.test --flake8


Para usar con git:
https://houndci.com/
Hound comments on style violations in GitHub pull requests, allowing you and your team to better review and maintain a clean codebase.

En travis-ci tambien se pueden poner chequeos
