Convertir entre unidades: bytes, kbytes, mbytes
pip install hurry.filesize

>>> from hurry.filesize import size
>>> size(1024)
'1K'

Lo malo es que solo devuelte int.



import math

def convert_size(size_bytes):
   if (size_bytes == 0):
       return '0B'
   size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   i = int(math.floor(math.log(size_bytes, 1024)))
   p = math.pow(1024, i)
   s = round(size_bytes/p, 2)
   return '%s %s' % (s, size_name[i])
