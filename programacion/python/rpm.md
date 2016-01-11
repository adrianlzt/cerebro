https://docs.python.org/2/distutils/builtdist.html
https://docs.python.org/2.0/dist/creating-rpms.html

Python puede generar RPMs directamente.

python setup.py bdist_rpm

--spec-only          only regenerate spec file
--source-only        only generate source RPM
--binary-only        only generate binary RPM

los genera en dist/


Codigo fuente (creo que usa mas ficheros):
./site-packages/setuptools/command/bdist_rpm.py

https://hg.python.org/releasing/2.7.9/file/tip/Lib/distutils/command/bdist_rpm.py#l410
Ahi se va generando el fichero en la variable spec_file


Para añadir ficheros sueltos:
setup.py:
...
setup (
    ...
    include_package_data=True,
    zip_safe=False,
    data_files=[('/opt/icinga', ['resources/cirros-0.3.3-x86_64-disk.img', 'resources/cert.pem'])]
)
