Alguna forma de que "dapr" se ponga en modo debug para ver que está haciendo?

Por qué necesita internet al hacer un init?
❌  Cannot get the latest release version: Get https://api.github.com/repos/dapr/dapr/releases: dial tcp: lookup api.github.com on 172.30.0.1:53: server misbehaving
Hacerlo opcional?

No veo que levante un redis al hacer "dapr init"
Parece que es porque ya tengo un redis corriendo, los containers están en estado "Creating"
Deberia poder ser parametrizable el puerto a usar.


placement es un servicio central?
que pasa si se cae? HA? cluster?


que hace "dapr run"? Solo ejecutar la app con unas cuantas variables de entorno?


probando a bloquear el puerto de la app local con iptables-drop y llamando a dapr, no parece que gestione el tema de los timeouts por defecto.
Si está bloqueado el acceso, devuelve un error de timeout


Que funcion tiene el dapr placement?
  es un server grpc
  parece que se usa para los actors

pubsub:
  quien se encarga de preguntar a las apps si están suscritas a algún topic? el dapr de cada una?
