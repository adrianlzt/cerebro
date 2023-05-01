#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
Get GCP IAP brands.
To get the brands we have to call /v1/projects/datadope/brands?alt=json

Before calling this script, you need to set the environment variable GOOGLE_APPLICATION_CREDENTIALS.
With that google application credentials we need to generate a token (signed_jtw) to call the API.
"""

import json
import os
import requests
import jwt
import time
import sys

def get_signed_jwt(client_email, private_key_id, private_key):
    """Get signed jwt."""
    now = int(time.time())
    payload = {
        'iat': now,
        'exp': now + 3600,
        'aud': 'https://www.googleapis.com/oauth2/v4/token',
        'iss': client_email,
        'scope': 'https://www.googleapis.com/auth/cloud-platform'
    }
    additional_headers = {
        'kid': private_key_id
    }
    signed_jwt = jwt.encode(payload, private_key, headers=additional_headers, algorithm='RS256')
    return signed_jwt

def get_iap_brands(credentials):
    """Get IAP brands."""
    # Get oauth2 token
    request_url = 'https://www.googleapis.com/oauth2/v4/token'
    payload = {
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': get_signed_jwt(credentials['client_email'], credentials['private_key_id'], credentials['private_key'])
    }
    response = requests.post(request_url, data=payload)
    if response.status_code != 200:
        raise Exception(f"Error getting oauth2 token: {response.text}")

    access_token = response.json()['access_token']

    # Get iap brands
    project_id = credentials['project_id']
    request_url = f"https://iap.googleapis.com/v1/projects/{project_id}/brands?alt=json"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(request_url, headers=headers)
    return response.json()

def main():
    """Main."""
    with open(os.environ['GOOGLE_APPLICATION_CREDENTIALS']) as f:
        credentials = json.load(f)

    brands = get_iap_brands(credentials)
    if len(brands['brands']) == 0:
        print("No brands found")
        sys.exit(1)

    print(brands['brands'][0]['name'])

if __name__ == '__main__':
    main()
