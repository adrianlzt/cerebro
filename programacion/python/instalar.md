http://parijatmishra.wordpress.com/2008/10/08/python-packaging-setuptools-and-eggs/


Para compilar e instalar los programas.
Mirar archivo de ejempolo en este directorio: setup-example.py


$ python setup.py build
$ python setup.py bdist_egg    # Genera un .egg
  Como parte del proceso ejecuta:
  python2.7 setup.py install_egg_info
  que genera el fichero, o directorio, xxx-egg-info
  Fichero en versiones viejas de setuptools
  http://perso.crans.org/besson/_static/python/lib/python2.7/distutils/command/install_egg_info.py
  f = open(target, 'w')
    Segun ese fichero siempre va a generar un egg-info fichero


$ python setup.py install


# easy_install fichero.egg
# easy_install http://blabla.com/file.egg
# easy_install json   # Lo instalará desde pypi.python.org


## Proxy ##
http_proxy=http://blabla.com:4643 easy_install paquete

Parece que no funciona, probar con https_proxy


## Clasificadores ##
https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
            'Environment :: Web Environment',
            ....
    ],

## Entrypoints ##
https://pythonhosted.org/setuptools/setuptools.html#automatic-script-creation
http://reinout.vanrees.org/weblog/2010/01/06/zest-releaser-entry-points.html

setup(
    # other arguments here...
    entry_points={
        'console_scripts': [
            'foo = my_package.some_module:main_func',
            'bar = other_module:some_func',
        ],
        'gui_scripts': [
            'baz = my_package_gui:start_func',
        ]
    }
)

## RPMs ##
mirar rpm.md

## Python 2.7 en CentOS 5
wget http://www.python.org/ftp/python/2.7.3/Python-2.7.3.tgz
tar -xzvf Python-2.7.3.tgz
cd Python-2.7.3
./configure
make altinstall

Si queremos tener zlib, tendremos que tener instalado zlib-devel antes de dar al configure
para tener https, necesitamos tener instalado: openssl-devel
