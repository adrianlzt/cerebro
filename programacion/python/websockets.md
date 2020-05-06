# Python3
https://websockets.readthedocs.io/en/stable/intro.html

# Python2.7
https://pypi.python.org/pypi/websocket-client/0.7.0



Ejemplo haciendo una subscripción en graphql
import websocket
c=websocket.create_connection("ws://localhost:8081/subscriptions")
c.send('{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {  postLikesSubscribe {    likes  }}"}}')
while True:
    print(c.recv_data())
