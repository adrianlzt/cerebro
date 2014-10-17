import falcon
import json
from datetime import datetime


# REST resources ...
class MyResource:
   def on_get(self, req, resp):
       """Handles GET requests"""
       resp.status = falcon.HTTP_200  

       def handlerDatetime(obj):
           if isinstance(obj, datetime):
               return obj.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
           else:
               raise TypeError(
                 'Object of type %s with value of %s is not JSON serializable'.format(type(obj),
                                                                                repr(obj)))
       resp.body = json.dumps({'status': 'ok', 'time': datetime.utcnow()}, default=handlerDatetime)

# falcon.API instances are callable WSGI apps
app = falcon.API()

# things will handle all requests to the '/things' URL path
app.add_route('/my_path', MyResource())
