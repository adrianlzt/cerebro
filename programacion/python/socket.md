https://docs.python.org/3/library/socket.html
https://docs.python.org/2/library/socket.html
https://hg.python.org/releasing/2.7.9/file/tip/Modules/socketmodule.c


Conex TCP
import socket
timeout = 30.0
sa = ('80.35.57.186', 443)
sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM,socket.IPPROTO_TCP)
sock.settimeout(timeout)
sock.connect(sa)
sock.close()


https://idea.popcount.org/2014-04-03-bind-before-connect/
Si queremos forzar el puerto origen primero haremos un bind:
sock.bind(("192.168.2.36",34444))


# SSL
import ssl
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock_ssl = ssl.wrap_socket(sock)


# Enviar hexadecimal
sock.sendall(bytes.fromhex("0405AABB"))



# UDP
https://wiki.python.org/moin/UdpCommunication

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))


Recibir mensajes UDP:
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", SOURCE_PORT))
sock.settimeout(1)
data,client = sock.recvfrom(1024)
// Si tras 1 segundo no recibe datos saltara la excepcion socket.timeout (esto es por poner el timeout)
