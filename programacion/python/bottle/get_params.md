http://bottlepy.org/docs/dev/api.html#bottle.BaseRequest.params
http://bottlepy.org/docs/dev/api.html#bottle.MultiDict

@bottle.route('/auth_complete')
def auth_complete():
    return request.params.get("test")

