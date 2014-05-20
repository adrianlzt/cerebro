fatrace - report system wide file access events

CentOS:
  Parece que no hay paquete.  Tiene como dependencia a python3

Traza los siguientes eventos:
  O open
  R read
  W write
  C close


Nos dice todas las aperturas, lecturas, escrituras y cerramientos de ficheros.
fatrace -t
  -t, --timestamp               Add timestamp to events. Give twice for seconds since the epoch.

fatrace -tp PID
  -p PID, --ignore-pid PID      Ignore events for this process ID. Can be specified multiple times
  CUIDADO! Saca todo menos ese PID.
  Usar grep para filtrar

It does not report file access by fatrace itself, to avoid logging events caused by writing the output into a file. It also ignores events on virtual and kernel file systems such as sysfs, proc, and devtmpfs
