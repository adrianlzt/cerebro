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



Como poner namespace de user:
https://success.docker.com/KBase/Introduction_to_User_Namespaces_in_Docker_Engine


Ejecutar desde el host comandos en el container entrando en su namespace:
nsenter
