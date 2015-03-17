#!/usr/bin/env python2.7
# To obtain SECRET, KEY and CONSUMER_KEY:
# maas LOGIN account create-authorisation-token

import oauth.oauth as oauth
import requests
import uuid
import json

ENDPOINT='http://localhost/MAAS/api/1.0'
SECRET='yuq9GXb9jL3BKNpSX8'
KEY='LHA6r8EnvtegZRp3nLDLnuaL3VFgRVry'
CONSUMER_KEY='pBGvYNES5fMhMNSVRm'

def main():
  inventory = get_inventory()
  print(json.dumps(inventory, indent=4))

def get_inventory():
  # TODO: Get credentials
  inventory = {"_meta": {"hostvars": {}}}

  response = perform_API_request(ENDPOINT, '/nodes/?op=list', 'GET', SECRET, KEY, CONSUMER_KEY)

  nodes = json.loads(response.text)
  for node in nodes:
    add_server(node['hostname'], node['ip_addresses'][0], node['tag_names'], inventory)

  return inventory

def add_server(hostname, ip, groups, inventory):
  for group in groups:
    host_group = inventory.get(group, {})
    hosts = host_group.get('hosts', [])
    hosts.append(hostname)
    host_group['hosts'] = hosts
    inventory[group] = host_group
    #inventory["_meta"]["hostvars"].update({hostname: {"ansible_ssh_host": ip}})
    # Uncomment to force ip for each host

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

if __name__ == "__main__":
    main()
