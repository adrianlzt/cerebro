http://bottlepy.org/docs/dev/api.html#bottle.BaseRequest.params
http://bottlepy.org/docs/dev/api.html#bottle.MultiDict

from bottle import route, run, template, post, request

@bottle.route('/auth_complete')
def auth_complete():
    return request.params.get("test")

