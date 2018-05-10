import falcon

class DynamicInfo:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

        resp.body = "hola que tal"

application = falcon.API()
application.add_route('/', DynamicInfo())

# gunicorn --reload super_simple_server
