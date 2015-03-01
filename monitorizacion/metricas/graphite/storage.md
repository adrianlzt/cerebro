https://graphite.readthedocs.org/en/latest/config-carbon.html

Usar whisper-calculator.py para calcular cuanto ocupará cada fichero.

## storage-schemas.conf ##
Es una cosa que querremos cambiar es 
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

Tras crear una nueva métrica, esperar un poco para empezar a emitir datos, whisper tarda un poco en cargar la nueva configuración.
Podemos comprobar mirando el log /opt/graphite/storage/log/carbon-cache/carbon-cache-a/creates.log que esquema y agregación se ha asignado.

Si hacemos alguna modificacion, los ficheros ya creados no se verán afectados.
Para que tengan el nuevo formato deberemos utilizar whisper-resize:
whisper-resize.py /opt/graphite/storage/whisper/test/netcat.wsp 1:1d


No hace falta reiniciar tras modificar el fichero.


## storage-aggregation.conf ##

Changing this file will not affect .wsp files already created on disk. Use whisper-set-aggregation-method.py to change those.

Si tenemos 
  retentions = 1s:1m,10s:10m
  xFilesFactor = 0.5
  aggregationMethod = average

Si tenemos al menos 5 muestras entre, por ejemplo, las 17:34:00 y las 17:34:09, hará la media y lo pondrá en el valor 17:34:00

Si son las 17:34:50 y consultamos los valores entre las 17:34:19 y las 17:34:41 nos dará 11 muestras.
Si son las 17:36:00 para el mismo periodo solo nos dará las muestras 17:34:20, 17:34:30 y 17:34:40
