from bottle import Bottle,request,response
...
@bottle.get('/')
def hello():
  response.status_code = 400
  response.content_type = 'application/json'
  return
