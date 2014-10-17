https://docs.python.org/2/howto/urllib2.html


import urllib2
response = urllib2.urlopen('http://python.org/')
html = response.read()


## Cookies ##
req1 = urllib2.Request(url1)
response = urllib2.urlopen(req1)
cookie = response.headers.get('Set-Cookie')

# Use the cookie is subsequent requests
req2 = urllib2.Request(url2)
req2.add_header('cookie', cookie)
response = urllib2.urlopen(req2)
