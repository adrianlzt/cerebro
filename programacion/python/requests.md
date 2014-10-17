http://docs.python-requests.org/en/latest

HTTP for Humans
Python’s standard urllib2 module provides most of the HTTP capabilities you need, but the API is thoroughly broken. It was built for a different time — and a different web. It requires an enormous amount of work (even method overrides) to perform the simplest of tasks.

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
