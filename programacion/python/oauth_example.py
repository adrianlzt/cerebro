# https://maas.ubuntu.com/docs1.7/api_authentication.html?highlight=api
# 0-legged OAuth: the consumer accesses protected resources by submitting OAuth signed requests.

import oauth.oauth as oauth
import requests
import uuid

def perform_API_request(site, uri, method, key, secret, consumer_key):
    resource_tok_string = "oauth_token_secret=%s&oauth_token=%s" % (
        secret, key)
    resource_token = oauth.OAuthToken.from_string(resource_tok_string)
    consumer_token = oauth.OAuthConsumer(consumer_key, "")

    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer_token, token=resource_token, http_url=site,
        parameters={'oauth_nonce': uuid.uuid4().get_hex()})
    oauth_request.sign_request(
        oauth.OAuthSignatureMethod_PLAINTEXT(), consumer_token,
        resource_token)
    headers = oauth_request.to_header()
    url = "%s%s" % (site, uri)
    return requests.get(url, headers=headers)

response = perform_API_request(
    'http://localhost/MAAS/api/1.0', '/nodes/?op=list', 'GET', 'key', 'secret', 'consumer_key')

print(response.text)

