https://docs.python.org/2/howto/urllib2.html

Mejor usar requests.md


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



# Auth
http://stackoverflow.com/questions/2407126/python-urllib2-basic-auth-problem

import urllib2, base64

request = urllib2.Request("http://api.foursquare.com/v1/user")
# You need the replace to handle encodestring adding a trailing newline 
# (https://docs.python.org/2/library/base64.html#base64.encodestring)
base64string = base64.encodestring('%s:%s' % (username, password)).replace('\n', '')
request.add_header("Authorization", "Basic %s" % base64string)   
result = urllib2.urlopen(request)
