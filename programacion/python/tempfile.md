https://docs.python.org/2/library/tempfile.html

import tempfile

# fichero temporal
a = tempfile.TemporaryFile()



# directorio temporal definiendo donde queremos que se cree (/tmp es la ubicación por defecto)
# el usuario es el encargado de borrar el directorio al final:
tempfile.mkdtemp(dir="/tmp")

# borrado
import shutil
shutil.rmtree(tmp_dir)
