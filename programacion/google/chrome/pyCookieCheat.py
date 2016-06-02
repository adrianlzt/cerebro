#! /usr/bin/env python3
'''pyCookieCheat.py
2015022 Now its own GitHub repo, and in PyPi. 
    - For most recent version: https://github.com/n8henrie/pycookiecheat
    - This gist unlikely to be maintained further for that reason.
20150221 v2.0.1: Now should find cookies for base domain and all subs.
20140518 v2.0: Now works with Chrome's new encrypted cookies.

See relevant post at http://n8h.me/HufI1w

Use your browser's cookies to make grabbing data from login-protected sites easier.
Intended for use with Python Requests http://python-requests.org

Accepts a URL from which it tries to extract a domain. If you want to force the domain,
just send it the domain you'd like to use instead.

Intended use with requests:
    import requests
    import pyCookieCheat

    url = 'http://www.example.com'

    s = requests.Session()
    cookies = pyCookieCheat.chrome_cookies(url)
    s.get(url, cookies = cookies)

Adapted from my code at http://n8h.me/HufI1w

Helpful Links:
* Chromium Mac os_crypt: http://n8h.me/QWRgK8
* Chromium Linux os_crypt: http://n8h.me/QWTglz
* Python Crypto: http://n8h.me/QWTqte
'''

import sqlite3
import os.path
import urllib.parse
#import keyring
import sys
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2

def chrome_cookies(url):

    salt = b'saltysalt'
    iv = b' ' * 16
    length = 16

    def chrome_decrypt(encrypted_value, key=None):

        # Encrypted cookies should be prefixed with 'v10' according to the
        # Chromium code. Strip it off.
        encrypted_value = encrypted_value[3:]

        # Strip padding by taking off number indicated by padding
        # eg if last is '\x0e' then ord('\x0e') == 14, so take off 14.
        # You'll need to change this function to use ord() for python2.
        def clean(x):
            return x[:-x[-1]].decode('utf8')

        cipher = AES.new(key, AES.MODE_CBC, IV=iv)
        decrypted = cipher.decrypt(encrypted_value)

        return clean(decrypted)

    # If running Chrome on OSX
    if sys.platform == 'darwin':
        #my_pass = keyring.get_password('Chrome Safe Storage', 'Chrome')
        my_pass = my_pass.encode('utf8')
        iterations = 1003
        cookie_file = os.path.expanduser(
            '~/Library/Application Support/Google/Chrome/Default/Cookies'
        )

    # If running Chromium on Linux
    elif sys.platform == 'linux':
        my_pass = 'peanuts'.encode('utf8')
        iterations = 1
        cookie_file = os.path.expanduser(
            '~/.config/chromium/Default/Cookies'
        )
    else:
        raise Exception("This script only works on OSX or Linux.")

    # Generate key from values above
    key = PBKDF2(my_pass, salt, length, iterations)

    # Part of the domain name that will help the sqlite3 query pick it from the Chrome cookies
    domain = urllib.parse.urlparse(url).netloc
    domain_no_sub = '.'.join(domain.split('.')[-2:])

    conn = sqlite3.connect(cookie_file)
    sql = 'select name, value, encrypted_value from cookies '\
            'where host_key like "%{}%"'.format(domain_no_sub)

    cookies = {}
    cookies_list = []

    with conn:
        for k, v, ev in conn.execute(sql):

            # if there is a not encrypted value or if the encrypted value
            # doesn't start with the 'v10' prefix, return v
            if v or (ev[:3] != b'v10'):
                cookies_list.append((k, v))
            else:
                decrypted_tuple = (k, chrome_decrypt(ev, key=key))
                cookies_list.append(decrypted_tuple)
        cookies.update(cookies_list)

    return cookies

if __name__ == "__main__":
    print("hola")
    print(chrome_cookies("http://www.github.com"))
