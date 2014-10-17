http://falcon.readthedocs.org/en/latest/api/request_and_response.html#id1

name_friends = req.get_param_as_list('name_friends', transform=str.lower, required=True)
easy_param = req.get_param('easy_param')


http://localhost:8000/?clave=valor
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/plain'
        resp.body = req.get_param("clave")
