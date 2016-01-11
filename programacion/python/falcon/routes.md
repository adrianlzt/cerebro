http://falcon.readthedocs.org/en/stable/api/routing.html?highlight=routes

class Home(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = "home get" 


class SayHello(object):
    def on_get(self, req, resp, username):
        resp.status = falcon.HTTP_200
        resp.body = "sayhello get: %s" % username


# Home page
app.add_route('/', views.Home())

# Say hello
app.add_route('/hello/{username}', views.SayHello())

