import urequests
r = urequests.get("http://httpbin.org/get")
r.text

# Sockets / TCP
http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/network_tcp.html

>>> import socket
>>> addr_info = socket.getaddrinfo("towel.blinkenlights.nl", 23)
>>> addr = addr_info[0][-1]
>>> s = socket.socket()
>>> s.connect(addr)
>>> while True:
...     data = s.recv(500)
...     print(str(data, 'utf8'), end='')


def http_get(url):
    _, _, host, path = url.split('/', 3)
    addr = socket.getaddrinfo(host, 80)[0][-1]
    s = socket.socket()
    s.connect(addr)
    s.send(bytes('GET /%s HTTP/1.0\r\nHost: %s\r\n\r\n' % (path, host), 'utf8'))
    while True:
        data = s.recv(100)
        if data:
            print(str(data, 'utf8'), end='')
        else:
            break
