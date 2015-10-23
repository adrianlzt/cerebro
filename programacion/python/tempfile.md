https://docs.python.org/2/library/tempfile.html

import tempfile

# fichero temporal
a = tempfile.TemporaryFile()
a.write("Hello World!\n")

# fichero temporal con nombre (un fichero "normal" en /tmp)
a = tempfile.NamedTemporaryFile()
a = tempfile.NamedTemporaryFile(delete=False) # si no queremos que se borre al hacer el close()
a.write("Hello World!\n")
a.name
a.flush()
a.close()

The returned object is always a file-like object whose file attribute is the underlying true file object. This file-like object can be used in a with statement, just like a normal file.

with tempfile.NamedTemporaryFile(delete=False) as b:
  b.write("pepe")





# directorio temporal definiendo donde queremos que se cree (/tmp es la ubicación por defecto)
# el usuario es el encargado de borrar el directorio al final:
tmp_dir = tempfile.mkdtemp(dir="/tmp")

# borrado
import shutil
shutil.rmtree(tmp_dir)
