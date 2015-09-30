Mejor correr en Oracle JDK8

Oracle JDK8 is likely to be the fastest option (and supports the full range of aggressive tuning options with riemann -a), but I test and deploy with JDK 7 and 8, from both Oracle and OpenJDK. You're welcome to give other JVMs a shot, though!


Usar TCP.
UDP puede tirar (tirará) paquetes.

# Fault tolerance
No es posible.

http://riemann.io/howto.html#fault-tolerance


# Sharding
Posible, pero no out-of-the-box

http://riemann.io/howto.html#sharding


# Latencias, colas, client backpressure
Stream latency is how long it took for an event to flow through every stream

Server latency is how long it took for an event to be picked up by Riemann's TCP server, decoded, handed off to the streaming system, processed, and for the acknowledgement to be sent back to the client.

Si enviamos eventos muy rápido:
If you ignore the acknowledgement messages, you can just shove events at Riemann as fast as your runtime will let you. Those events will fill up a queue in front of Riemann's streaming system. If that fills up, they'll spill over into the Netty queue associated with the channel. If that fills up, they'll spill over into the TCP buffer on the Riemann box, and by extension, the queues in the network and the sending node. At some point TCP backpressure will come into play, but understanding that interaction can be complex.
...
You can detect this (and alert on it) by watching the service called "riemann netty execution-handler queue size"; if it starts getting above a thousand events or so, you're likely overloading Riemann. 
