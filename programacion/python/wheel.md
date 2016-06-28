https://packaging.python.org/en/latest/wheel_egg/

Crear wheel:
python setup.py bdist_wheel

Instalar wheel:
https://pip.pypa.io/en/stable/user_guide/#installing-from-wheels
pip install vCenter2Influx-0.1-py2-none-any.whl

Generar wheel para una lista de requisitos:
pip wheel --wheel-dir=/local/wheels -r requirements.txt

