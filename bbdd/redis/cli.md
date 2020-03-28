pip install iredis
otro cliente que SI tiene autocompletado de nombres de keys
iredis



redis-cli -h hostname -p puerto CMD

echo "pepe" | redis -x SET CLAVE

redis 127.0.0.1:6379> SET persona:nombre "adri"
OK
redis 127.0.0.1:6379> KEYS *
1) "persona:nombre"
redis 127.0.0.1:6379> TYPE persona:nombre
string
redis 127.0.0.1:6379> GET persona:nombre
"adri"


SETNX -> crea si no existe
DEL -> borra entrada
FLUSHALL -> borrar todas las keys
INCR -> hace += a la variable (la pone a 1 si no existe)
  Es una operación atómica, así evitamos problemas de dos usuarios haciendo: x=GET var; x=x+1; SET var X



## Keys temporales ##
EXPIRE clave 120 (se borra a los 120s)
TTL clave (nos dice los segundos que le quedan. -1 es para siempre)
Haciendo SET a la variable la fijamos para siempre


## Arrays / Listas ##
RPUSH clave "valor" <- pone al final (Right) de la lista
LPUSH clave "valor" <- pone al principio (Left) de la lista
LRANGE clave inicio fin <- devuelve los valores entre inicio y fin (-1 para el último valor) (no los borra de la lista)
LLEN clave <- tamaño de la lista
RPOP clave <- saca del final (Right)
LPOP clave <- saca del comienzo (Left)

## Sets ##
SADD clave "valor" <- agrega elemento al set
SREM clave "valor" <- elimina ese elemento de la lista
SISMEMBER clave "valor" <- nos devuelve 0 o 1 si "valor" pertenece al set clave
SMEMBERS clave <- nos devuelve los elementos del set
SUNION clave1 clave2 <- nos devuelvo un set con la unión de ambas claves
SCARD clave <- numero de elementos


## Sorted Sets ##
ZADD clave puntuacion "valor" <- set ordenado según la puntuación que demos a cada uno

## Hashes ## http://redis.io/commands#hash
HSET user:1000 name "John Smith"
HSET user:1000 email "john.smith@example.com"
HSET user:1000 password "s3cret"
HGETALL user:1000 <- nos devuelve todos los valores
HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com" <- definir varios de golpe
HGET user:1001 name => "Mary Jones"
HLEN coso   número de elementos del hash
