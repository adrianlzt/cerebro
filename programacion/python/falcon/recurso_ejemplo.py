class MySuperResource:
    def __init__(self):
        self.db = {'frodo': 'Frodo bolson', 'gandalf': 'Gandalf el blanco'}

    def on_get(self, req, resp, user_id):
        """Handles GET requests"""
        name_friends = req.get_param_as_list('name_friends', transform=str.upper, required=True)
        easy_param = req.get_param('easy_param')
        full_names = {name: self.db[key] for name in name_friends if key in self.db}
        
        resp.set_header('X-Powered-By', 'Telefonica')
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(full_names)
    
    def on_post(self, req, resp, user_id):
        # req.stream is wsgi.input but wrapped with Body for easy read

        if req.stream.stream_len == 0:
            raise falcon.HTTPBadRequest("Empty Body", "It was expected a json body")
        body = req.stream.read()
        try:
            json_body = ujson.loads(body)
        except ValueError as e:
            print "Invalid json body %s", e
            raise falcon.HTTPUnsupportedMediaType("Body is not a valid JSON object/array")
        self.db[json_body['name']] = json_body['full_name']

        resp.status = falcon.HTTP_201
        resp.location = '/users/%s/amigos/%s' % (user_id, json_body['name'])
