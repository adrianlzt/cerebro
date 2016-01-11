https://docs.python.org/2/library/contextlib.html#module-contextlib


Forma sencilla de generar funciones que se puedan usar con "with"
Al "abrir" se ejecutará lo que esté antes del yield.
Al "cerrar" se ejecutará lo que esté después del yield.



from contextlib import contextmanager

@contextmanager
def tag(name):
    print "<%s>" % name
    yield
    print "</%s>" % name

>>> with tag("h1"):
...    print "foo"
...
<h1>
foo
</h1>




@contextmanager
def redis_socket(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)
    s.connect((host, port))
    yield s
    s.close()
