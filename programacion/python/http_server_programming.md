http://docs.python.org/2/library/basehttpserver.html

def run(server_class=BaseHTTPServer.HTTPServer,
        handler_class=BaseHTTPServer.BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


Ejemplo completo:
https://github.com/Oneiroi/clustercheck/blob/master/clustercheck.py
