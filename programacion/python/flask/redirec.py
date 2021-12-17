#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8

"""
Redireccionar a una URL manteniendo el path
"""

import os
from flask import Flask,redirect,request

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def redir(path):
    return redirect(f"https://httpbin.org{request.full_path}", code=301)


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

