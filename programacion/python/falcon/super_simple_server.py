import falcon
from wsgiref import simple_server


class DynamicInfo(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200

        resp.body = "hola que tal"

app = falcon.API()
app.add_route('/', DynamicInfo())

if __name__ == '__main__':
    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()
