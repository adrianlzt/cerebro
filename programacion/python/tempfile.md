https://docs.python.org/2/library/tempfile.html

import tempfile

# fichero temporal
a = tempfile.TemporaryFile()
a.write("Hello World!\n")

# fichero temporal con nombre (un fichero "normal" en /tmp)
a = tempfile.NamedTemporaryFile()
a.write("Hello World!\n")
a.flush()
a.close()

The returned object is always a file-like object whose file attribute is the underlying true file object. This file-like object can be used in a with statement, just like a normal file.
Como usar esto?
with open('fichero', 'r') as file:
  lines = [line.strip('\n') for line in file.readlines()]





# directorio temporal definiendo donde queremos que se cree (/tmp es la ubicación por defecto)
# el usuario es el encargado de borrar el directorio al final:
tmp_dir = tempfile.mkdtemp(dir="/tmp")

# borrado
import shutil
shutil.rmtree(tmp_dir)
