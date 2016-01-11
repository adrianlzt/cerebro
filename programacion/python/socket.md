https://docs.python.org/2/library/socket.html
https://hg.python.org/releasing/2.7.9/file/tip/Modules/socketmodule.c


import socket

timeout = 30.0
sa = ('80.35.57.186', 443)
sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM,socket.IPPROTO_TCP)
sock.settimeout(timeout)
sock.connect(sa)
sock.close()

