Fluentd tiene un plugin para enriquecer con información las trazas preguntando a la API de kubernetes.
Cuidado con el input que tenemos.
Si es journald, creo que por cada traza tendra que consultar la api de kubernetes.
Si son ficheros json, lo hará una vez por cada apertura de fichero json.
