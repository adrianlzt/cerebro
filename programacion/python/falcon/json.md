class Query(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({"hola": "pepe"})


No hace falta definir el Content-Type, por defecto estará a json
