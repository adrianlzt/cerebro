# 3.4, hasta marzo 2018

## Dashboards / maps
Multiples dashboards, cada dashboard con los paneles que queramos.
Muchos nuevos widgets para agregar cualquier cosa, incluso un video.
Clonar mapas, dashboards.

## Preprocessing (Confiuration - Hosts)
Podemos aplicar expresiones regulares o json path antes de almacenarlos o procesarlos para generar alarmas.
Tipico caso, si recibios un fichero JSON, podemos aquí extraer el campo que queremos.
Tambien lo podemos usar para elminar partes que no queremos:
  0x123 -> 123
  "12 C" -> 12
  GET /index.html HTTP/1.0 200 -> Response code: 200
Podemos aplicar regex, json path y xml path.


## Mass processing of metrics
Dependencias entre metricas. Podemos asociar metricas a parent metrics

## Ejecutar comandos en zabbix proxy
ZBXNEXT-936, parece que antes solo podian ejecutarse comandos


# 4.0 LTS
https://support.zabbix.com/secure/ReleaseNote.jspa?projectId=10144&version=14114
tickets puestos para solucionarse en al version 4
