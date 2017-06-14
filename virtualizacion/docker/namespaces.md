Quitar namespace de PID
https://docs.docker.com/engine/reference/run/#pid-settings-pid
docker run --pid="host"
Nos monta /proc


Quitar namespace de network
docker run 
--net host


--privileged
Nos monta /dev


Storage:
-v "/:/host"
motanmos todos los puntos de montaje del host en el container sobre /host
