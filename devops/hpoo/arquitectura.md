OO Central
  Servidor
  Controla que todo este yendo bien. Controla las transiciones, y los pasos que se van dando.
  Los pasos se van alamcenando en una cola (mantenida por el servidor central, dentro del mismo SW)
  Las operaciones más simples (comparaciones de strings por ejemplo) se ejecutarán en el central
  La conexión entre el Central y los RAS es segura
  La autentificación soporta interna o LDAP

OO Ras
  Servidor
  Es quien realmente está ejecutando los pasos
  RAS consulta en la cola las operaciones que tienen que ejecutarse (si son de su tipo)
  En HP OO 9 era el central el que se conectaba a los RAS
  El RAS conectará con las APIs, routers, ssh, etc
  Los RAS se pueden meter en zonas específicas, al igual que hacemos con los gearman slaves. 
  Por ejemplo metemos un RAS en una red distinta abriendo un tunel hasta el central

DB externa

OO Studio
  Portatil usuario
  Montado sobre java
  Solo funciona en windows (no en XP)


Se puede montar sobre linux o windows tanto el central como los RAS.
El problema es que hay operaciones que van sobre .Net. El RAS que quiera ejecutar estas operaciones tiene que ser windows.


La base de datos: MySQL, Oracle o PostgreSQL y SQLServer
