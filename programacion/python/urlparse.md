# Python3
https://docs.python.org/3.6/library/urllib.parse.html?highlight=urlparse#urllib.parse.urlparse

from urllib.parse import urljoin


# Python2
https://docs.python.org/2/library/urlparse.html

>>> from urlparse import urljoin
>>> urljoin('http://www.cwi.nl', 'FAQ.html')
'http://www.cwi.nl/FAQ.html'



if "http" in self.args.livestatus_endpoint:
    return urljoin(self.args.livestatus_endpoint, "query")
else:
    return urljoin("http://"+self.args.livestatus_endpoint, "query")


>>> from urlparse import urlparse
>>> o = urlparse('http://www.cwi.nl:80/%7Eguido/Python.html')
>>> o
ParseResult(scheme='http', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            params='', query='', fragment='')

Si queremos obtener una copia quitando algun parametro.
Generamos el objeto a mano quitando lo que no queramos.
x = urlparse.ParseResult(scheme=o.scheme, netloc=o.netloc, path=o.path, params=o.params, query=o.query, fragment=o.fragment)

Para convertirlo de nuevo a url:
urlunparse(x)
