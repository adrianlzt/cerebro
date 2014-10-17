import socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(("0.0.0.0", 8005))
serversocket.listen(5)
