# Instalacion a mano
curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py
python /tmp/get-pip.py



Gestión de librerías para python.
Sería como un apt-get para python.
$ pip search <libreria>
$ pip install <libreria>
$ pip install MySQL_python==1.2.2
$ pip install -t lib/ psycopg2
  instalar en el dir lib/
$ pip install --upgrade <paquete>
$ pip install --index-url http://mirror.de.pip/pypi/pypi/simple python27-cffi
$ pip install git+https://github.com/ansible/ansible.git@devel
$ pip install -Iv http://sourceforge.net/projects/mysql-python/files/mysql-python/1.2.2/MySQL-python-1.2.2.tar.gz/download
  -I: ignore previous versions installed
  -v: verbose
$ pip install --use-wheel <paquete>
  instala el binario si esta disponible
$ pip show -f SomePackage
  mostrar ficheros del paquete
$ pip uninstall <libreria>
$ pip list

$ pip install --editable .
instala el paquete en "." sin moverlo al site-packages. Útil para desarrollar


## Proxy ## es https_proxy, NO http_proxy
https_proxy=http://web-proxy.mydomain.com pip install paquete
pip install --proxy="user:password@server:port" yourpackage


Mirar curdling.md para una versión más rápida


# freeze #
Obtener una lista de las versiones que estamos usando de las dependencias
pip freeze > requirements.txt

To answer the second part of this question, the two packages shown in pip list but not pip freeze are setuptools (which is easy_install) and pip itself. It looks like pip freeze just doesn't list packages that pip itself depends on. 


# Requested XXXX==N, but installing version M
Borrar /tmp/pip-build-root/XXXX


# Install from code
import pip
pip.main(['install', package])


def install_and_import(package):
    import importlib
    try:
        importlib.import_module(package)
    except ImportError:
        import pip
        pip.main(['install', package])
    finally:
        globals()[package] = importlib.import_module(package)


install_and_import('transliterate')
