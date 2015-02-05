IOError: [Errno 9] Bad file descriptor
Puede ser por intentar hacer un lock exclusivo (LOCK_EX) en un nfs cuando solo hemos abierto el archivo para lectura.

>>> fd = os.open("/srv/nagios/adri", os.O_RDONLY)
>>> fcntl.flock(fd, fcntl.LOCK_EX)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  IOError: [Errno 9] Bad file descriptor

https://docs.python.org/2/library/fcntl.html
On at least some systems, LOCK_EX can only be used if the file descriptor refers to a file opened for writing.

http://nfs.sourceforge.net/
D10

http://permalink.gmane.org/gmane.linux.nfs/38024
