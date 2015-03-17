https://docs.python.org/2/library/socket.html
networking/unix_sockets.md

sock = socket.socket(...
sock.getsockopt(level, optname[, buflen])

Tamaño del buffer recv
sock.getsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF)
