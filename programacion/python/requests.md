http://docs.python-requests.org/en/latest

convertir curl a request: http://curl.trillworks.com/

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

## Post
r = requests.post("http://httpbin.org/post", data = {"key":"value"})

Post de JSON:
r = requests.post(url, json=payload)


### multipart/form-data
requests.post("...",files=(("op","ticket"),("robots_value","654321")),...)
->
Content-Type: multipart/form-data; boundary=----W



--f5735a76b1c84ea291353a37212ab6c8

Content-Disposition: form-data; name="op"; filename="op"



ticket
...



## Proxy
Se pasan como variable de entorno. Uno para http y otro para https
HTTPS_PROXY="http://proxy2pdi.service.dsn.inet:6666" HTTP_PROXY="http://proxy2pdi.service.dsn.inet:6666" python

Otra manera:
proxies = {
  'http': 'http://10.10.1.10:3128',
  'https': 'http://10.10.1.10:1080',
}

requests.get('http://example.org', proxies=proxies

Si defino proxies http como None, no se usará.

### Socks
https://pypi.python.org/pypi/requesocks/0.10.8

session = requesocks.session()
session.proxies = {'http': 'socks5://127.0.0.1:9050', 'https': 'socks5://127.0.0.1:9050'}
r = session.get('https://api.github.com', auth=('user', 'pass')) # no obligatorio
print(r.status_code)
print(r.headers['content-type'])
print(r.text)


## SSL
Peticion ssl, comprobando que el certificado sea válido
import requests
r = requests.get('https://github.com/', verify=True)

En verify le podemos pasar un path a un fichero.
r = requests.get('https://midominio.com/path', verify='/home/alopez/micert.pem')

Por defecto requests tiene su lista de certificados en:
PATH_DE_PYTHON/site-packages/requests/cacert.pem

Para quitar el mensaje de error:
/usr/lib/python2.7/site-packages/requests/packages/urllib3/connectionpool.py:791: InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.org/en/latest/security.html


import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


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


# Timeout
http://docs.python-requests.org/en/latest/user/quickstart/#timeouts
requests.get('http://github.com', timeout=0.001)


# Cabeceras por defecto
Requests mete por defecto (The gzip and deflate transfer-encodings are automatically decoded for you.)

Si queremos eliminar estas cabeceras:
  http://stackoverflow.com/questions/27043402/python-requests-remove-the-content-length-header-from-post
  http://docs.python-requests.org/en/master/user/advanced/#prepared-requests

from requests import Request, Session

s = Session()
req = Request('POST', url, data=data)
prepped = req.prepare()
del prepped.headers['content-length']
response = s.send(prepped)

# Raw
Podemos acceder a la respuesta exacta del servidor si al hacer la peticion especificamos stream=True y luego usamos el objecto r.raw.

Ejemplo:
r = requests.get(url=forward_url +'/'+ path, params=params, headers=headers, cookies=cookies, stream=True)
r.raw

Otro ejemplo:
s = requests.Session()
req = requests.Request('GET', forward_url +'/'+ path, params=params, headers=headers, cookies=cookies)
prepped = req.prepare()
r = s.send(prepped, stream=True)
r.raw


IMPORTANTE!
r.raw es un file-like object que esta abierto (podemos comprobarlo con r.raw.closed) en principio.
PERO, si hacemos r.content, lee el contenido y cierra el fichero.

r.raw.data tambien cierra el fichero


# Redirects
No seguir redirects:
allow_redirects=False

# Guardar un pdf
r_casa = requests.get("http://www.casareal.es/ES/Transparencia/InformacionJuridica/Documents/RegalosInstitucionales2015.pdf", stream=True)
with open("casa.pdf", "w") as f:
  f.write(r_casa.content)


# Time
>>> import requests
>>> response = requests.get('http://www.google.com')
>>> print response.elapsed
0:00:01.762032
>>> response.elapsed
datetime.timedelta(0, 1, 762032)
