https://sysdigcloud.com/aws-storage-latency-sysdig-spectrogram/

Es el tiempo de las llamadas al sistema.
Va poniéndose más rojo según la cantidad de llamadas al sistema que tarden en ejecutarse ese tiempo.

Espectrograma general:
sysdig -c spectrogram [resolucion]
  la resolucion es cada cuanto tiempo nos sacará datos en pantalla.
  Si no ponemos data, agregará datos durante 1s y nos mostrará una linea.
  Si ponemos 100, agregará datos durante 100ms

sysdig -c spectrogram "proc.name=httpd and fd.type=file and evt.latency > 1000000"


Vamos incrementanto la latencia hasta que vemos que solo nos quedamos con los eventos más costosos:
sysdig -r node1.scap -c spectrogram "evt.latency > 1000000000"

Ahora podemos quitar el chisel para ver cuales son esas operaciones


Si queremos ver la periodicidad de algo es mejor usar subsecoffset
