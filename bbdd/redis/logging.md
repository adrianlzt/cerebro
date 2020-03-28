https://build47.com/redis-log-format-levels/

pid:role timestamp loglevel message

Ej:
1:M 27 Jan 13:00:58.936 * Background AOF rewrite finished successfully


Por defecto el nivel de logging es NOTICE

Comprobar nivel actual:
config get loglevel


Podemos modificarlo en el fichero de config (redis.conf):
loglevel notice
