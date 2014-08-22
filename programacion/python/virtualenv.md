http://pythoncentral.org/setting-up-the-python-environment-with-virtualenv/

Crear un entorno donde poder tener python con una version y paquetes determinados, independiente del resto del sistema.

Puede ser útil para hacer deploys de diferentes versiones de nuestra app, y tener una forma de hacer rollback sencilla.



pip install virtualenv
virtualenv xxx
source xxx/bin/activate

Ahora ya lo que instalemos con pip irá al entorno virtual
pip install ...
