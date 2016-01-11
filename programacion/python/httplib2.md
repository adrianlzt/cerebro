Los certificados que usa:
/usr/lib/python2.6/site-packages/httplib2/cacerts.txt

Parece que la versión de ubuntu si lee los del sistema:
https://bugs.launchpad.net/ubuntu/+source/python-httplib2/+bug/882027

import httplib2
h = httplib2.Http(".cache")
h.add_credentials('name', 'password')
resp, content = h.request("https://example.org/chap/2", 
    "PUT", body="This is text", 
    headers={'content-type':'text/plain'} )
