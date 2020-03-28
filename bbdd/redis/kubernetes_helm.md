Levantar un redis, sin cluster y sin persistencia:
helm3 install redis stable/redis --set cluster.enabled=false,master.persistence.enabled=false
