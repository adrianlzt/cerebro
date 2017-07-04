https://docs.python.org/2/howto/urllib2.html

Mejor usar requests.md

python3:
import urllib
urllib.request.urlopen("http://8.7.6.5")


import urllib2
response = urllib2.urlopen('http://python.org/')
html = response.read()

# Encode
Si queremos generar algo tipo: 
import urllib
cadena = urllib.urlencode({"Cabecera": "valor", "xx": 3})
'Cabecera=valor&xx=3'
Si la cabecera o el valor pueden tener tildes:
cadena.encode("utf8")

Si queremos tener un orden determindo de los params:
cadena = urllib.urlencode(("Cabecera", "valor"), ("xx", 3))

req = urllib2.Request("http://httpbin.org/get?" + urllib.urlencode({"pepe":123}))
urllib2.urlopen(req).read()

Para codificar en formato uri:
>>> urllib2.quote("http://localhost:8080")
'http%3A//localhost%3A8080'

Para codificar tambien las / (http://stackoverflow.com/questions/1695183/how-to-percent-encode-url-parameters-in-python):
>>> urllib2.quote("http://localhost:8080", safe="")
'http%3A%2F%2Flocalhost%3A8080'


## Cookies ##
req1 = urllib2.Request(url1)
response = urllib2.urlopen(req1)
cookie = response.headers.get('Set-Cookie')

# Use the cookie is subsequent requests
req2 = urllib2.Request(url2)
req2.add_header('cookie', cookie)
response = urllib2.urlopen(req2)


## POST ##
import urllib2
response = urllib2.urlopen('https://48465678.ngrok.io/skype/adrianlzt', "DATOS")

## PUT ##
import urllib2
req = urllib2.Request("http://httpbin.org/put", data="pepe=3")
req.get_method = lambda: "PUT"
urllib2.urlopen(req).read()


# Auth
http://stackoverflow.com/questions/2407126/python-urllib2-basic-auth-problem

import urllib2, base64

request = urllib2.Request("http://api.foursquare.com/v1/user")
# You need the replace to handle encodestring adding a trailing newline 
# (https://docs.python.org/2/library/base64.html#base64.encodestring)
base64string = base64.encodestring('%s:%s' % (username, password)).replace('\n', '')
request.add_header("Authorization", "Basic %s" % base64string)   
result = urllib2.urlopen(request)


# Headers
import urllib
import urllib2

url = 'http://www.someserver.com/cgi-bin/register.cgi'
user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
values = {'name' : 'Michael Foord',
          'location' : 'Northampton',
          'language' : 'Python' }
headers = { 'User-Agent' : user_agent }

data = urllib.urlencode(values)
req = urllib2.Request(url, data, headers)
response = urllib2.urlopen(req)
the_page = response.read()


# Errores
https://docs.python.org/2/howto/urllib2.html#handling-exceptions

Si no puede conectar lanzará una excepcion:
urllib2.URLError: <urlopen error [Errno -2] Name or service not known>

Error 404 también genera una excepcion:
urllib2.HTTPError: HTTP Error 404: Not Found

from urllib2 import Request, urlopen, URLError, HTTPError
req = Request(someurl)
try:
    response = urlopen(req)
except HTTPError as e:
    print 'The server couldn\'t fulfill the request.'
    print 'Error code: ', e.code
except URLError as e:
    print 'We failed to reach a server.'
    print 'Reason: ', e.reason
else:
    # everything is fine

Con e.read() podemos leer el contenido de la respuesta



# Internals
>>> result = urllib2.urlopen(request)
>>> dir(result)
['__doc__', '__init__', '__iter__', '__module__', '__repr__', 'close', 'code', 'fileno', 'fp', 'getcode', 'geturl', 'headers', 'info', 'msg', 'next', 'read', 'readline', 'readlines', 'url']

if result.getcode() == "200":
  ...

result.msg
  "OK"

body = result.readlines()

Obtener un body json:
data = json.load(result)


# Timeout
py3:
import urllib
urllib.request.urlopen("http://8.7.6.5", timeout=3)


import socket
import urllib2

# timeout in seconds
timeout = 10
socket.setdefaulttimeout(timeout)

# this call to urllib2.urlopen now uses the default timeout
# we have set in the socket module
req = urllib2.Request('http://www.voidspace.org.uk')
response = urllib2.urlopen(req)

# Imagen
img = urllib2.urlopen("http://static3.rutinasentrenamiento.com/wp-content/uploads/Curl-Biceps-Alterno-tipo-Martillo.jpg")
img sera un objecto file descriptor
img.read()
etc

# Proxy
proxy = urllib2.ProxyHandler({'http': '127.0.0.1', 'https': '127.0.0.1:8080'})
opener = urllib2.build_opener(proxy)
urllib2.install_opener(opener)
urllib2.urlopen('http://www.google.com')
