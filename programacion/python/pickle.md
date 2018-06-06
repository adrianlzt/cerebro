https://docs.python.org/3.5/library/pickle.html

Lograr IO más alto.
Serialización

Python has an output method called a pickle, and newer versions of Python, including the version I tested (2.6.6), use a high-speed I/O package called cStringIO. Although pickling the data resulted in hitting the 4,096-byte buffer limit with 2,000 elements, it also resulted in a much smaller amount of output than with Fortran or C. Pickling your Python data can have a huge effect on Python I/O performance compared with using the classic fwrite() method.


Mostrar contenido de un fichero:
python -c "import pickle; f = open('proc_identifier.cache', 'rb'); print(pickle.load(f))"


import pickle
import requests

res = requests.get("http://google.es")

with open('dump.bin', 'wb') as f:
  pickle.dump(res,f)

with open('dump.bin', 'rb') as f:
  data = pickle.load(f)

data.status_code
