http://spew.berlios.de/ parece que ha desaparecido
http://ftp.tu-chemnitz.de/pub/linux/dag/redhat/el5/en/x86_64/rpmforge/RPMS/spew-1.0.4-1.2.el5.rf.x86_64.rpm
bajado el rpm en este dir

stress.md tambien ofrece parte de esta funcionalidad


Escribe ficheros de distintas formas.
Nos dice la velocidad de escritura y las IOPS

spew -i 100 10M FILE
  Hace 100 iteracciones escribiendo 10MB al fichero FILE

spew -b 16k 1m /tmp/bigfile
  Writes 1 mebibyte (1 mebibyte = 1024*1024 bytes) using 16 kibibytes (1 kibibyte = 1024 bytes) requests to the file /tmp/bigfile using the default pattern (random). Displays the write transfer rate in kibibytes per second and the write transfer time in seconds.
