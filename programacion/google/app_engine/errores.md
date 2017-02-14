Error: 500 Internal Server Error
Si vemos errores 500 con python, puede ser porque está saltando una excepción no controlada.


WARNING  2016-06-23 13:55:30,540 urlfetch_stub.py:540] Stripped prohibited headers from URLFetch request: ['Host']
https://cloud.google.com/appengine/docs/python/outbound-requests#request_headers
Por seguridad GAE quita ciertas cabeceras.
  Content-Length
  Host
  Vary
  Via
  X-Appengine-Inbound-Appid
  X-Forwarded-For
  X-ProxyUser-IP
