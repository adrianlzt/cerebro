http://www.crummy.com/software/BeautifulSoup/

Beautiful Soup provides a few simple methods and Pythonic idioms for navigating, searching, and modifying a parse tree: a toolkit for dissecting a document and extracting what you need. It doesn't take much code to write an application
Beautiful Soup automatically converts incoming documents to Unicode and outgoing documents to UTF-8. You don't have to think about encodings, unless the document doesn't specify an encoding and Beautiful Soup can't detect one. Then you just have to specify the original encoding.
Beautiful Soup sits on top of popular Python parsers like lxml and html5lib, allowing you to try out different parsing strategies or trade speed for flexibility.

pip install beautifulsoup4


# Doc
http://www.crummy.com/software/BeautifulSoup/bs4/doc/

# Ejemplo
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

with open("fichero.html") as fd:
    html = fd.read()

soup = BeautifulSoup(html, 'html.parser')
soup.title



Obtener el valor de esta linea de la cabecera de un html:
<meta content="J0lD46c5jAKbAX5wrf7Dv+Yt9yctNCkiVcFUkRZUwjg=" name="csrf-token" />
soup.find(name="meta",attrs={"name": "csrf-token"}).get("content")



Parsear fichero xml obtenido de un GET:

import requests
from bs4 import BeautifulSoup
r = requests.get("http://httpbin.org/xml")
soup = BeautifulSoup(r.content)
for e in soup.slideshow.findAll("slide"):
  print(e.title.string)

