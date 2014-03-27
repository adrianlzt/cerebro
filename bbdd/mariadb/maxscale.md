https://www.skysql.com/downloads/maxscale-mariadb-mysql

Database-centric proxy server
Es un load balancer inteligente.

Es un HA-Proxy especializado para databases.

Objetives
  highgly scalable
  lightweight, with small footprint
  minimum possible latency
  highly available
  extendible
  must provide auth
  must be transparent
  Improve scalability
  Log, filter or transform queries and data
  Improve availability

Que es la app:
  event driven network I/O processor


Architecture:
  Auth (el módulo de auth puede usarse para apps php que andan reconectandose todo el rato, dejando logueada dicha app)
  Protocol (por ahora mysql protocol)
  Monitor (chequear las máquinas, comprobar que papel juegan, master, slave, galera replication, etc)
  Router (se pueden enrutar conexiones enteras o statement a statement)
  filter & logging


La idea es que todos los clientes se conecten a MaxScale y este se dedique a redirigir las peticiones a nuestro cluster.

Ejemplo, una app que usa dos conex, 1 para RW otra para RO.
MaxScale enviará la conex RW al master, y la RO al pool de slaves.


Aunque una aplicación habra una única conexión que sera RW, MaxScale puede anlizar los statements y dividiros en RW y RO. Enviará las RO a los slaves y los INSERTS/UPDATES a los masters.



Ahora, 20/03/2014, en la versión 0.4, si mientras un client está conectado mediante MaxSlave a un nodo y ese nodo muere, el cliente recibirá una terminación de conexión. Se espera que en la versión 0.5 MaxScale gestion automáticamente un AUTO-CONNECT a otro nodo.



High availability en MaxScale, dos posibilidades:
  - dos instancias levantanas y una load balancer delante
  - un maxscale pegado a cada nodo de aplicación (no debería ser problema porque es ligero). Mala idea si tenemos muchos nodos de aplicación.
