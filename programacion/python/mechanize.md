http://wwwsearch.sourceforge.net/mechanize/
http://stockrt.github.io/p/emulating-a-browser-in-python-with-mechanize/

programmatic web browsing

Es como requests pero nos va guardando el estado (cookies, etc)
Funciona como la lib de urllib más extensiones para hacer scrapping

import mechanize
req = mechanize.Request("http://httpbin.org/cookies/set/sessioncookie/123456789")
res = mechanize.urlopen(req)
mechanize.urlopen("http://httpbin.org/headers").read()
'{\n  "headers": {\n    "Accept-Encoding": "identity", \n    "Cookie": "sessioncookie=123456789", \n    "Host": "httpbin.org", \n    "User-A
gent": "Python-urllib/2.7"\n  }\n}\n'



# Browser
import mechanize
br = mechanize.Browser()


## Headers
br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]

Si definimos varias veces la misma cabecera tendrá prioridad la que antes se defina:
>>> br.addheaders = [('Content-Type', 'application/janes'),('Content-Type', 'application/json')]
>>> br.open("http://httpbin.org/get").read()
'{\n  "args": {}, \n  "headers": {\n    "Accept-Encoding": "identity", \n    "Content-Type": "application/janes", \n    "Host": "httpbin.org"\n  }, \n
  "origin": "85.59.183.194", \n  "url": "http://httpbin.org/get"\n}\n'

Añadir headers al final, menos prioritarias:
br.addheaders += [('Coso', 'pepe')]

Añadir headers al principio, más prioritarias:
br.addheaders = [('Coso', 'pepe')] + br.addheaders



## Proxy
br.set_proxies({"http": "myproxy.example.com:3128"})



## POST

### urlencode
br.open("http://httpbin.org/post", data="pepito=23").read()

### JSON
req = br.request_class("http://httpbin.org/post", headers={"Content-Type": "application/json"})
br.open(req, data=json.dumps({"pepito":23})).read()



## PUT
req = br.request_class("http://httpbin.org/put")
req.get_method = lambda: "PUT"
br.open(req).read()



# Quitar SSL
import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    # Legacy Python that doesn't verify HTTPS certificates by default
    pass
else:
    # Handle target environment that doesn't support HTTPS verification
    ssl._create_default_https_context = _create_unverified_https_context
