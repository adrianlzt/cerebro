Framework para construir aplicaciones con arquitecturas de microservicios.
Darp provee los building blocks necesarios: pub/sub, estado, events, etc

Parece que el sistema se basa en montar un sidecar con una API HTTP/JSON en cada aplicación, y ese sidecar es el que sabe comunicarse con los componentes (redis, kafka, etc).
Con APIs sencillas permite salvar estado (guardar un key-value en redis), usando un path determinado hablamos con una app determinada (v1.0/invoke/NOMBRE/method/XXX).

No tengo claro aún si hay elementos centrales.
Parece que el "placement" debe ser un servicio central.


Mirar:
  install.md
  uso.md
