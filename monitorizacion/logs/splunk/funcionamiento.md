Splunk indexa los eventos en solo unos pocos metadatos (servidor, sourcetype, timestamp) y otro campo para todo el mensaje de log.
Al buscar se aplican los "field extract" al vuelo, si seleccionamos el modo de búsqueda "Smart mode".

En "Fast mode" no tiene extracción de campos.

De este comportamiento se entiende que la información no la almacena indexada (bueno, solo los metadatados).
