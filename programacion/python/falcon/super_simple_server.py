import falcon

class DynamicInfo(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

        resp.body = "hola que tal"

application = falcon.API()
application.add_route('/', DynamicInfo())

# gunicorn --reload nombre.application
