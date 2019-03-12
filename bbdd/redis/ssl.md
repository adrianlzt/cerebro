Redis no soporta TLS

La gente lo que hace es poner stunnel por delante y también con los clientes.

Script para simplificar la conex a un rediss (como se le suele llamar a redis + tls):
https://github.com/ibm-watson-data-lab/stunredis/

Siempre espera que le pasemos password (si no tenemos, borrar en la linea 68)

Si no queremos que verifique el cert cambiar verifyChain a no


# Server
Container que monta un stunnel para tener ssl/tls
docker run --rm -it -v `pwd`/rediscert.pem:/stunnel/private.pem:ro -e REDIS_PORT_6379_TCP_ADDR=127.0.0.1 -e REDIS_PORT_6379_TCP_PORT=6379 --net host runnable/redis-stunnel

Podemos usar "mkcert" para generar ese cert privado necesario



# Cliente
https://medium.com/ibm-watson-data-lab/how-to-stunnel-to-redis-on-demand-with-stunredis-960d804b3d68
https://github.com/ibm-watson-data-lab/stunredis/blob/master/stunredis.sh
Si queremos usar redis-cli

Si no queremos verificar el cert borrar las líneas:
verifyChain
checkHost
CAfile

./stunredis.sh rediss://127.0.0.1:6380
