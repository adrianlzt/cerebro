syslocation  "Donde esta"
syscontact  Pepe <pepe@noexiste.es>
sysservices 12
master          agentx
agentAddress  udp:161 #Define en que interfaz y puerto escucha
rocommunity public 10.0.0.0/8 #Define una comunidad de solo lectura (ReadOnly) que se llama public y que puede acceder desde la red 10 entera
rocommunity ada 10.9.4.0/22 #Define otra comunidad de lectura que puede acceder desde la red 10.9.4.0/22

agentAddress  udp:127.0.0.1:161 #Define en que interfaz y puerto escucha
rocommunity public
