http://stackoverflow.com/questions/2317849/how-can-i-use-a-socks-4-5-proxy-with-urllib2
http://sourceforge.net/projects/socksipy/

en requests.md está como hacerlo en caso de usar requests.

import socks
import socket
socks.setdefaultproxy(socks.PROXY_TYPE_SOCKS5, "127.0.0.1", 8080)
socket.socket = socks.socksocket
import urllib2
print urllib2.urlopen('http://www.google.com').read()
