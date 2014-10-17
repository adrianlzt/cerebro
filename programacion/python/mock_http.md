https://github.com/gabrielfalcao/HTTPretty

from httpretty import activate, register_uri, GET, POST, PUT, DELETE, last_request

# Mockear la respuesta POST a una url
@activate
def test_post_with_response_body(self):
    register_uri(
        POST,
        self.base_url + 'projects/name',
        status=201,
        body=json.dumps(TestClient.RESPONSE_BASIC),
        content_type='application/json')

    # Without body in request
    response = self.client.post('projects/name')
    self.assertEqual(response, TestClient.RESPONSE_BASIC)


