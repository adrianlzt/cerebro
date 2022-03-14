https://httpie.org/

pacman -S httpie


http [flags] [METHOD] URL [ITEM [ITEM]]



# Ejemplos
https://httpie.org/doc

http POST httpbin.org/post mensaje=hola foo=bar
  esto envia un POST application/JSON con {"mensaje": "hola", "foo": "bar"}
http PUT example.org X-API-Token:123 name=John
http -f POST example.org hello=World
http -v example.org
http -a USERNAME POST https://api.github.com/repos/jkbrzt/httpie/issues/83/comments body='HTTPie is awesome! :heart:'
http example.org < file.json
http example.org/file > file
http --download example.org/file
http localhost:8000 Host:example.com

--body
si solo queremos obtener el body, sin ver las cabeceras.


http --session=logged-in -a username:password httpbin.org/get API-Key:123
http --session=logged-in httpbin.org/headers

http -v  POST https://duckdns.org/api/states/lavadora x-ha-access:YOUR_PASSWORD state=true attributes:='{"fin": "1h"}'
