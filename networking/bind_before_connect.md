https://idea.popcount.org/2014-04-03-bind-before-connect/

Podemos forzar el puerto origen con esta técnica:

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Let the source address be 192.168.1.21:1234
s.bind(("192.168.1.21", 1234))
s.connect(("www.google.com", 80))
