pip install gunicorn
gunicorn --reload look.app


from wsgiref import simple_server
...
if __name__ == '__main__':
    httpd = simple_server.make_server('0.0.0.0', 8000, app)
    httpd.serve_forever()
    print("listening on port 8000")
