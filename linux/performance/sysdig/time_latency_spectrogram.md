https://sysdigcloud.com/aws-storage-latency-sysdig-spectrogram/

Espectrograma general:
sysdig -c spectrogram

sysdig -c spectrogram "proc.name=httpd and fd.type=file and evt.latency > 1000000"


Vamos incrementanto la latencia hasta que vemos que solo nos quedamos con los eventos más costosos:
sysdig -r node1.scap -c spectrogram "evt.latency > 1000000000"

Ahora podemos quitar el chisel para ver cuales son esas operaciones
