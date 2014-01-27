Arquitectura de Ducksboard.

HTTP se usa para cargar información "estática" de una BD postgres.
Websocket se usa para cargar información realtime de un redis.


Escritor----RTdata--->Redis
   |			|
   |		     websocket
historical		|
  data			|
   |			|
   |			|
 Postgres---HTTP-----cliente
