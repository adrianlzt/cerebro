    def on_post(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/plain'
        body = req.stream.read()
        body_json = json.loads(body)
        resp.body = "DATOS: %s" % body_json['clave']
