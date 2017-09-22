Recibir mensajes por HTTP:

Config del input:
<source>
  @type http
  port 9880
</source>

Ejemplo de envio de datos:
curl -X POST -d 'json={"123456":"awesome"}' "http://localhost:9880/test.tag.here"
