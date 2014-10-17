# Hooks
# Solo se ejecutan si se hace un match en un route.

def auth(req, resp, params):
    # Alternatively, use Talons or do this in WSGI middleware...
    token = req.get_header('X-Auth-Token')

    if token is None:
        raise falcon.HTTPUnauthorized('Auth token required', 'Auth token required')

    if not token_is_valid(token, params['user_id']):
        raise falcon.HTTPUnauthorized('Invalid token', 'The token is invalid')

def check_media_type(req, resp, params):
    if not req.client_accepts_json:
        raise falcon.HTTPUnsupportedMediaType('only JSON please')

def token_is_valid(token, user_id):
    return True 

# Como usarlos globalmente
# Configure your WSGI server to load "things.app" (app is a WSGI callable)
app = falcon.API(before=[auth, check_media_type])
app.add_route('/users/{user_id}', MySuperResource())
