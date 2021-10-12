https://console.cloud.google.com/networking/networks/details/default

Redes privadas dentro de google.

Si queremos conectar usando IPs privadas a servicios gestionados de google, por ejemplo CloudSQL, deberemos definir un rango de IPs privado, que será donde se espongan dichos servicios.
Ese rango privado deberá estar configurado como "allocated ip ranges for services" en la red, en la sección "Private service connection".
Necesitaremos tener activa la API "Service Networking"

# Cloud SQL
https://cloud.google.com/sql/docs/postgres/configure-private-ip
