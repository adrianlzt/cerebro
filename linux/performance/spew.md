http://spew.berlios.de/

spew -i 100 10M FILE
  Hace 100 iteracciones escribiendo 10MB al fichero FILE ?

spew -b 16k 1m /tmp/bigfile
  Writes 1 mebibyte (1 mebibyte = 1024*1024 bytes) using 16 kibibytes (1 kibibyte = 1024 bytes) requests to the file /tmp/bigfile using the default pattern (random). Displays the write transfer rate in kibibytes per second and the write transfer time in seconds.
