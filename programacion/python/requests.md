http://docs.python-requests.org/en/latest

HTTP for Humans
Python’s standard urllib2 module provides most of the HTTP capabilities you need, but the API is thoroughly broken. It was built for a different time — and a different web. It requires an enormous amount of work (even method overrides) to perform the simplest of tasks.

## Get simple
import requests
r = requests.get('http://github.com/')

r.content
  valor devuelto
r.ok
  si todo fue bien
r.status_code
  codigo HTTP devuelto
r.request
  lo que hemos enviado
r.request.headers
r.request.body
r.json()
r.request.method
  GET, POST, etc

## Headers
headers = {"Authorization": "Bearer HVKAB34N3SMRDRL5PIYR"}
r = requests.get("https://api.wit.ai/message?v=20151022&q=crear%20nueva%20wo", headers=headers)

## Parametros
>>> payload = {'key1': 'value1', 'key2': 'value2'}
>>> r = requests.get("http://httpbin.org/get", params=payload)
>>> print(r.url)
http://httpbin.org/get?key2=value2&key1=value1

## Proxy
Se pasan como variable de entorno. Uno para http y otro para https
HTTPS_PROXY="http://proxy2pdi.service.dsn.inet:6666" HTTP_PROXY="http://proxy2pdi.service.dsn.inet:6666" python

## SSL
Peticion ssl, comprobando que el certificado sea válido
import requests
r = requests.get('https://github.com/', verify=True)

En verify le podemos pasar un path a un fichero.
r = requests.get('https://midominio.com/path', verify='/home/alopez/micert.pem')

Por defecto requests tiene su lista de certificados en:
PATH_DE_PYTHON/site-packages/requests/cacert.pem


## Sessions
http://docs.python-requests.org/en/latest/user/advanced/#session-objects
The Session object allows you to persist certain parameters across requests. It also persists cookies across all requests made from the Session instance.

s = requests.Session()

s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')
r = s.get("http://httpbin.org/cookies")

print(r.text)
# '{"cookies": {"sessioncookie": "123456789"}}'


Ejemplo login con cookies:
http://www.mediawiki.org/wiki/User:Sebelino7/Login_with_Python

## Proxy ##
HTTP_PROXY="http://10.10.1.10:3128" python
import requests
...
## Códigos http
requests.codes.ok

Todos los códigos en: https://github.com/kennethreitz/requests/blob/master/requests/status_codes.py


# Auth
from requests.auth import HTTPBasicAuth
requests.get('https://api.github.com/user', auth=HTTPBasicAuth('user', 'pass'))
