https://packaging.python.org/tutorials/distributing-packages/

Para poder subir paquetes a pypi usaremos:
pip install twine


Ejemplo de proyecto:
https://github.com/pypa/sampleproject



data_files nos permite instalar ficheros en otras paths distintos.
Por ejemplo, crear ficheros en /etc

Si el path es relativo, los ficheros se instalarán a partir de sys.prefix (~/.virtualenvs/nombre/ para el caso de venvs)
En distutils.sysconfig.get_python_lib() tenemos el path donde se instalan los módulos.
distutils.sysconfig.get_python_lib(1, 0, "")
  Esto nos da únicamente el path relativo a sys.prefix. Ej.: 'lib/python2.7/site-packages'
