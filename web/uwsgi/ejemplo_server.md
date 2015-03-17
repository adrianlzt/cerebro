app.py
def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return ["Hello World"]

uwsgi -s uwsgi.sock --listen=1 --wsgi-file app.py

$ cat query_example.hex | xxd -r -p | nc -U uwsgi.sock
HTTP/1.1 200 OK
Content-Type: text/html

Hello World
