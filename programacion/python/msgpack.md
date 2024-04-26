Unas 10x más rápido que json (http://computers-are-fast.github.io/):



import msgpack

with open('./setup/protobuf/message.msgpack') as f:
    message = f.read()

msgpack.unpackb(message)

El soporte de datetime se ha de activar manualmente: msgpack.packb(data, datetime=True)
El datetime ha de llevar codificada la tz:
datetime.now().astimezone()
