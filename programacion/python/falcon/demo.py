import falcon
import json
from datetime import datetime


# Hooks
def token_is_valid(token, user_id):
    return True


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


# REST resources ...
class MyResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200

        def handlerDatetime(obj):
            if isinstance(obj, datetime):
                return obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            else:
                raise TypeError(
                    'Object of type %s with value of %s is not JSON serializable'.format(type(obj), repr(obj)))
        resp.body = json.dumps({'status': 'ok', 'time': datetime.utcnow()}, default=handlerDatetime)


@falcon.before(auth)
class MySuperResource(object):
    def __init__(self):
        self.db = {'frodo': 'Frodo bolson', 'gandalf': 'Gandalf el blanco'}

    def on_get(self, req, resp, user_id):
        """Handles GET requests"""
        name_friends = req.get_param_as_list('name_friends', transform=str.lower, required=True)
        easy_param = req.get_param('easy_param')
        full_names = {name: self.db[name] for name in name_friends if name in self.db}

        resp.set_header('X-Powered-By', 'Telefonica')
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(full_names)

    def on_post(self, req, resp, user_id):
        # req.stream is wsgi.input but wrapped with Body for easy read

        if req.stream.stream_len == 0:
            raise falcon.HTTPBadRequest("Empty Body", "It was expected a json body")
        body = req.stream.read()
        try:
            json_body = json.loads(body)
        except ValueError as e:
            print "Invalid json body %s", e
            raise falcon.HTTPUnsupportedMediaType("Body is not a valid JSON object/array")
        self.db[json_body['name']] = json_body['full_name']

        resp.status = falcon.HTTP_201
        resp.location = '/users/{}/amigos/{}'.format(user_id, json_body['name'])

    def on_put(self, request, response, user_id):
        raise Exception('Can not put')


# falcon.API instances are callable WSGI apps
# Configure your WSGI server to load "things.app" (application is a WSGI callable)
application = falcon.API(before=[check_media_type])
# things will handle all requests to the '/things' URL path
application.add_route('/my_path', MyResource())
application.add_route('/users/{user_id}', MySuperResource())


def handleException(ex, req, resp, params):
    if not isinstance(ex, falcon.HTTPError):
        resp.body = json.dumps({'error': 'Exception', 'cause': str(ex)})
        resp.status = falcon.HTTP_500
    else:
        raise ex

application.add_error_handler(Exception, handleException)

# gunicorn --reload ejemplo.application
