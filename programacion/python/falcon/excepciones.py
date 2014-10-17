    def on_put(self, request, response, user_id):
        raise Exception('Can not put')


def handleException(ex, req, resp, params):
        resp.body = json.dumps({'error': 'Exception'})
        resp.status = falcon.HTTP_500


app.add_error_handler(Exception, handleException)
