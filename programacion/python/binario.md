https://pyoxidizer.readthedocs.io/en/latest/comparisons.html
  es un rust que corre python dentro.
  Típicamente le decimos que modulos de pip queremos y que ejecute el main
  no lo he probado

https://gregoryszorc.com/blog/2019/06/24/building-standalone-python-applications-with-pyoxidizer/

http://www.pyinstaller.org/

Generar un binario a partir de un script con sus dependencias.

pyinstaller fichero.py
Genera el binario en dist/fichero/fichero



The approach that tools like Shiv and PEX take is to leverage Python's built-in support for running zip files. Essentially, if there is a zip file containing a __main__.py file and you execute python file.zip (or have a zip file with a #!/usr/bin/env python shebang), Python can load modules in that zip file and execute an application within. Pretty cool!


XAR is a pretty cool offering from Facebook. XAR files are executables that contain SquashFS filesystems. Upon running the executable, SquashFS filesystems are created. For Python applications, the XAR contains a copy of the Python interpreter and all your Python modules. At run-time, these files are extracted to SquashFS filesystems and the Python interpreter is executed. If you squint hard enough, it is kind of like a pre-packaged, executable virtualenv which also contains the Python interpreter.
