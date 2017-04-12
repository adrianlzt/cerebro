Si usamos alias para definir un directorio, el path de url no se usará.

Ejemplo:

location /pepe {
  alias /www/html/data
}
curl 127.0.0.1/pepe -> busca /www/html/data/index.html



Root en cambio pone todo el path del url:
location /pepe {
  alias /www/html/data
}
curl 127.0.0.1/pepe -> busca /www/html/data/pepe/index.html
