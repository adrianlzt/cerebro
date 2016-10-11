https://webapp-improved.appspot.com/

webapp2 is a lightweight Python web framework compatible with Google App Engine’s webapp.


# Inicializacion
import webapp2


# Routing
app = webapp2.WSGIApplication(
    [
     ('/', MainHandler),
     ('/notify', NotifyChange),
     ('/about', AboutHandler),
     (decorator.callback_path, decorator.callback_handler()),
    ],
    debug=True)

# Handlers
class MainHandler(webapp2.RequestHandler):

  def get(self):
    self.response.write("hola")

  def post(self):
    self.response.write("hola post")


# Variables disponibles en self
https://webapp2.readthedocs.io/en/latest/guide/request.html#common-request-attributes


# GET
https://webapp2.readthedocs.io/en/latest/guide/request.html#get-data

/test?check=a&check=b&name=Bob

self.request.GET['check']




# POST
https://webapp2.readthedocs.io/en/latest/guide/request.html#post-data

application/x-www-form-urlencoded

self.request.POST['variable']



# Headers
self.request.headers['nombre']


