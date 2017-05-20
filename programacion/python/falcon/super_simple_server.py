import falcon
from wsgiref import simple_server


class DynamicInfo(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

        resp.body = "hola que tal"

application = falcon.API()
application.add_route('/', DynamicInfo())

if __name__ == '__main__':
    httpd = simple_server.make_server('127.0.0.1', 8000, application)
    httpd.serve_forever()
