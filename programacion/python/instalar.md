http://parijatmishra.wordpress.com/2008/10/08/python-packaging-setuptools-and-eggs/


Para compilar e instalar los programas.
Mirar archivo de ejempolo en este directorio: setup-example.py


$ python setup.py build
$ python setup.py bdist_egg    # Genera un .egg
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
