http://bottlepy.org/docs/dev/api.html#the-request-object

Objeto que tiene la info de la petición.


from bottle import route, run, template, post, request
...
request.cookies.username
request.body.getvalue()
