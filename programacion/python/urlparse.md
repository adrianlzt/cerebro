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

