CRM - Cluster Resource Manager (Pacemaker en nuestro caso): provides the brain that processes and reacts to events regarding the cluster. These events include nodes joining or leaving the cluster; resource events caused by failures, maintenance, scheduled activities; and other administrative actions. Pacemaker will compute the ideal state of the cluster and plot a path to achieve it after any of these events. This may include moving resources, stopping nodes and even forcing them offline with remote power switches.

Corosync provides reliable messaging, membership and quorum information about the cluster.
Más detalles más abajo.

Due to recent standardization within the cluster filesystem community, they make use of a common distributed lock manager which makes use of Corosync for its messaging capabilities and Pacemaker for its membership (which nodes are up/down) and fencing services.

	cLVM2	GFS2   OCFS2
	   \      |    /
	    \     |   /
       Distributed lock manager
           /
     Pacemaker
	 |
    ------------------
    |        |         \
 corosync    |      resource agents
             |        |
            cluster glue



## Pacemaker internals ##
CIB (aka. Cluster Information Base)
PEngine (aka. PE or Policy Engine)
CRMd (aka. Cluster Resource Management daemon)

           pengine
	      ^
	      |
stonithd<----crmd--->cib
    ^          ^      ^
    |          |      |
    v          v      v
 cluster abstraction layer
               |
	       |
	       v
	   corosync (fuera de pacemaker)

Funcionamiento:
1.- CIB usa XML para representar tanto la configuración del cluster como el estado actual de este.
    El contenido del CIB esta replicado en todos los nodos del cluster
2.- PEngine usa el CIB para calcular el estado ideal del cluster y como se va a conseguir.
3.- Cada nodo corre una instancia de crmd, y uno de ellos es elegido como DC (designated coordinator).
    Este nodo coordinador ejecutará las acciones calculadas por el PEngine, pasándoselas a los crmd de los otros nodos via cluster messaging infrastructure.
4.- Los nodos devuelven los resultados de sus operaciones de vuelta al DC; este nodo, junto con el resultado esperando, puede hacer dos cosas:
	-Esperar para intentar llegar al estado ideal
	-Abortar, y pedir a PEngine que recalcule el estado ideal basado en los nuevos resultados inesperados

STONITHd (Shoot-The-Other-Node-In-The-Head): para proteger información compartida a veces es necesario apagar nodos.
Generalmente se implementa con un script que apague físicamente la máquina, o avisando a VMWare (o quien corresponda) que apague el nodo.
STONITH se modela como un recurso más en el CIB.


## Corosync internals ##
http://en.wikipedia.org/wiki/Corosync_(project)
The Corosync Cluster Engine is a group communication system.
Features:
  A closed process group communication model with virtual synchrony guarantees for creating replicated state machines.
  A simple availability manager that restarts the application process when it has failed.
  A configuration and statistics in-memory database that provide the ability to set, retrieve, and receive change notifications of information.
  A quorum system that notifies applications when quorum is achieved or lost.
 
Pacemaker se carga como un módulo, les llama service engines, Corosync Cluster Engine, para poder usar la API interna, que provee:
  An implementation of the Totem Single Ring Ordering and Membership[1] protocol providing the Extended Virtual Synchrony model[2] for messaging and membership.
  The coroipc high performance shared memory IPC system.[3]
  An object database that implements the in memory database model.
  Systems to route IPC and Totem messages to the correct service engines.

Corosync tamién provee de:
  cpg - Closed Process Group
  sam - Simple Availability Manager
  confdb - Configuration and Statistics database
  quorum - Provides notifications of gain or loss of quorum

[1] http://www.csie.fju.edu.tw/~yeh/research/papers/os-reading-list/amir-tocs95-totem.pdf
    Protocolo para permitir operaciones concurrentes mediante una ordenación total en los mensajes de broadcast.
    Se consigue mediante un token que circula por el anillo establecido entre los nodos.
[2] http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.55.8677&rep=rep1&type=pdf
    http://www.cs.huji.ac.il/labs/transis/lab-projects/guide/chap3.html
[3] https://www.kernel.org/doc/ols/2009/ols2009-pages-61-68.pdf
    High performance client server interprocess communication system
