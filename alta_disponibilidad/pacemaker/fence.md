## Virtualbox ##
https://code.google.com/p/fencevbox/

En bash: http://meinit.nl/virtualbox-fencing-and-red-hat-enterprise-linux-cluster-suite
Aqui explican un poco como usarlo


Paquete con agentes:
http://www.centos.org/docs/3/html/rh-gfs-en-6.0/s1-fence-methods.html


Podemos tener un fence_manual
Este escribirá en el log la máquina que debemos apagar. Tras apagarla se debe ejecutar el comando 
fence_ack_manual -s IPAddress
para que la máquina se entere de que ya la hemos apagado


Si usamos CMAN, redirigiremos las peticiones de fencinf a Pacemaker:
"Configuring real fencing devices in CMAN will result in nodes being fenced multiple times as different parts of the stack notice the node is missing or failed."
http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Clusters_from_Scratch/_configuring_cman_fencing.html
