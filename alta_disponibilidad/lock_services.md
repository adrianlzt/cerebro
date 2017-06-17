Rise of the Lock Service http://progrium.com/blog/2014/07/29/understanding-modern-service-discovery-with-docker/
alta_disponibilidad/distributed_systems.md


# Paxos
El algoritmo de Paxos es un algoritmo para llegar a consensos en sistemas distribuidos con cierto grado de tolerancia a fallos. Entendemos consenso como el proceso de ponerse de acuerdo sobre uno de los resultados entre un grupo de participantes. Este problema se hace difícil cuando los participantes o su medio de comunicación puede experimentar fallos.

Complejo de implementar




# Raft
https://raft.github.io/
http://thesecretlivesofdata.com/raft/
Raft es un protocolo de consenso que trabaja eligiendo un líder central sobre el que se hacen las peticiones y coordina al resto de nodos (seguidores) para implementarlas. El ejemplo típico de uso de este algoritmo es para la escritura de mensajes en un log replicado.

Más simple que paxos

Tres estados para los nodos: follower, candidate, leader

1.- leader election
Comienzan todos en follower, volviéndose candidates si no escuchan de un lider (election timeour: random entre 150ms y 300ms)
El candidato solicita votos a los otros nodos (envia un mensaje el hacía los otros). Se vuelve leader si recibe una mayoría de los votos (evitamos split brain).
En caso de empate se espera un tiempo y se realiza otra votación (uno de los nodos se adelantará al otro y ganará).
Al hacerse lider envia mensajes "Append Entries" (se usarán para enviar los datos también) periódicamente (heartbeat timeout) a los followers.
Los followers votan por el primer candidato que se lo solicite si no habían votado ya. Tras votar esperan el "Append Entries". Si pasa demasiado tiempo sin mensaje, se vuelven candidatos.

2.- log replication
Todos los cambios los realiza siempre el lider
Apunta el dato recibido un su log, marcado como uncommitted (no verificado).
Envia el dato al resto del cluster y si recibe una respuesta afirmativa por una mayoría marca el dato como válido en su log. Contesta al usuario.
Avisa a los follower para que validen el dato también en sus logs.

3.- network partition
Los que estén en minoría no podrán commitear nuevos datos porque no tendrán mayoría.
Al arreglarse la partición, si había lider en la partición minoritaria, verá que hay un lider con mayoría y se volverá follower.
Los minoritarios harán rollback hasta el último id commiteado y se actualizarán con la última info del master.

Dudas:
si envio un dato a un nodo no leader, lo rechaza? o se lo pasa al lider?
cuando el lider ha validado un dato, pero está confirmación no ha llegado a los followers, el cluster tiene un tiempo donde no contesta lo mismo, no?
un nodo nuevo se une justo cuando desaparece el lider y gana la votación, logs de los followers incompatibles con este nuevo nodo?
lider envia datos a nodo1, nodo1 dice ack, lider contesta a usuario. nodo1 se sale del cluster. alguien pregunta a nodo1. Nodo1 contesta mal hasta cuando?



# Implementaciones
Chubby (Google), basado en Paxos, distributed lock service consistent, partition-tolerant.
Zookeeper implementa algo similar OpenSource

raft
etcd usa raft
consul, basado en las ideas de etcd

