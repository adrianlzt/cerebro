pip install redis


import redis

r = redis.from_url("127.0.0.1:6379")
r.keys()
r.sadd("movimientos","2222")
r.sismember("movimientos","2222")


r.set("dni","05345881p")
r.get("dni")


r.get("noexiste")
  devuelve None
