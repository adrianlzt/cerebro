http://graphite.readthedocs.org/en/0.9.10/config-carbon.html


Una cosa que querremos cambiar es storage-schemas.conf
En este fichero se define para cada tipo de información enviada, cuanto se almacenará, y cada cuanto tiempo se tomarán las muestras

A given rule is made up of 3 lines:
  A name, specified inside square brackets.
  A regex, specified after “pattern=”
  A retention rate line, specified after “retentions=”
  The retentions line can specify multiple retentions. Each retention of frequency:history is separated by a comma.
  
Frequencies and histories are specified using the following suffixes:
  s - second
  m - minute
  h - hour
  d - day
  y - year

[mis_test_1sec_1d]
pattern = ^test
retentions = 1s:1d

Si hacemos alguna modificacion, los ficheros ya creados no se verán afectados.
Para que tengan el nuevo formato deberemos utilizar whisper-resize:
whisper-resize.py /opt/graphite/storage/whisper/test/netcat.wsp 1:1d


No hace falta reiniciar tras modificar el fichero.
