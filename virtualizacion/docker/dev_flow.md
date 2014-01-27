Ejemplo de la presentación: http://www.youtube.com/watch?feature=player_embedded&v=izaolRP_fFc

Tienen un proxy (hipache) que apunta a un backend (app python) donde corre realmente su aplicación (gordon, gestión de tickets)

Cuando quieren hacer un desarrollo, entran en el código de gordon, y hacen un cambio.
Luego hacen el "make", que es crear una imagen (docker build -t user/gordon .
Esta creación de imagen debe aprovechar los caches, así que debería ser rápido (los comandos ADD no hacen cache, mirar caching.md)

Una vez construída la imagen se ejecuta un script (https://github.com/dotcloud/gordon/blob/master/launch) que se encarga de poner la nueva imagen en producción.
Esta imagen hace:
  Busca la imagen de hipache (el proxy que redirige el tráfico a los backends)
  Obtiene el puerto del redis que corre donde hipache. De esta manera tiene un endpoint (host que corre docker + puerto) que apunta a la máquina hipache
  Se arranca la nueva imagen pasándole unas cuantas variables de entorno (-e var=value). En estas se le pasa a la máquina el endpoint de redis
  Ahora ya tenemos la nueva máquina corriendo comunicándose via redis con el proxy
  Por último, nos conectamos al redis para decirle a hipache que ahora apunte a la nueva imagen
    redis-cli -h $REDIS_HOST -p $REDIS_PORT del frontend:$GORDON_DOMAIN
    redis-cli -h $REDIS_HOST -p $REDIS_PORT rpush frontend:$GORDON_DOMAIN api
    redis-cli -h $REDIS_HOST -p $REDIS_PORT rpush frontend:$GORDON_DOMAIN http://$API_HOST:$API_PORT

Esto nos da una gran facilidad de rollback, ya que todo lo que tendríamos que hacer es decirle a hipache que vuelva a apuntar a la imagen anterior.


