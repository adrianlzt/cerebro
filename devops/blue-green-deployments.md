http://blog.christianposta.com/deploy/blue-green-deployments-a-b-testing-and-canary-releases/

# Blue-green
http://martinfowler.com/bliki/BlueGreenDeployment.html

Tener desplegados dos entornos idénticos. Uno con versión v1 otra con v2.
En un momento dado en el balanceador damos el cambiazo y dejamos de apuntar a v1 para pasar a apuntar v2.

https://github.com/stevvooe/sillyproxy
Ejemplo usando docker swarm y un proxy

https://github.com/vfarcic/docker-flow-blue-green


# Canary releases
En la canary la idea es que vayamos pasando un porcentaje de usuarios (por ejemplo 10%) a la nueva versión, eligiendo algún parámetro para decidir que usuarios van a una u otra versión (por ejemplo, random, por cookie, etc).


En ambos casos si tenemos bbdd deberemos hacer cambios incrementales, nunca borrar nada.
Por ejemplo, si necesitamos una nueva tabla, mantener las dos e ir migrando los cambios.
Cuando estemos completamente en la nueva versión ya podremos borrar las tablas antiguas.

bbdd es un problema en cualquier caso: http://blog.christianposta.com/deploy/blue-green-deployments-a-b-testing-and-canary-releases/#comment-2174931973


# Toggle features
http://martinfowler.com/articles/feature-toggles.html#ToggleConfiguration
https://github.com/juandebravo/hanoi

Python para ver que funcionalidades se muestran a los usuarios dependiendo de algunas variables o porcentajes.
Se hacen con decoradores en python.
