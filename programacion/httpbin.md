http://httpbin.org/

HTTP Request & Response Service

Web donde puedes hacer GET, POST, etc para probar aplicaciones.
Por ejemplo puedes hacer:

s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')
r = s.get("http://httpbin.org/cookies")

print r.text
# '{"cookies": {"sessioncookie": "123456789"}}'


curl -XPOST http://httpbin.org/post -H "Content-Type: application/json" -d '{"test":123}'
