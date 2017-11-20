http://docs.docker.com/articles/networking/#binding-container-ports-to-the-host
http://docs.docker.com/userguide/dockerlinks/
http://stackoverflow.com/questions/19897743/exposing-a-port-on-a-live-docker-container

# Find IP address of container with ID <container_id>
docker inspect <container_id> | grep IPAddress | cut -d '"' -f 4

# General syntax
docker run -p [([<host_interface>:[host_port]])|(<host_port>):]<container_port>[/udp] <image> <cmd>

# Bind TCP port 8080 of the container to TCP port 80 on 127.0.0.1 of the host machine.
docker run -p 127.0.0.1:80:8080 <image> <cmd>

# Bind TCP port 8080 of the container to a dynamically allocated TCP port on 127.0.0.1 of the host machine.
docker run -p 127.0.0.1::8080 <image> <cmd>

# Bind TCP port 8080 of the container to TCP port 80 on all available interfaces of the host machine.
docker run -p 80:8080 <image> <cmd>

# Bind TCP port 8080 of the container to a dynamically allocated TCP port on all available interfaces of the host machine.
docker run -p 8080 <image> <cmd>

# Bind UDP port 5353 of the container to UDP port 53 on 127.0.0.1 of the host machine.
docker run -p 127.0.0.1:53:5353/udp <image> <cmd>

# Bind to a dynamically allocated port
docker run -p 127.0.0.1::8080 -name dyn-bound <image> <cmd>

# Lookup the actual port
docker port dyn-bound 8080
127.0.0.1:49160


### Linking a container ###
# Server expose port 80
docker run -expose 80 -name server <image> <cmd>

# Client links
docker run -name client -link server:linked-server <image> <cmd>


# Creando a mano un puerto a un container que ya esta corriendo
https://forums.docker.com/t/how-to-expose-port-on-running-container/3252/14

iptables -t nat -A DOCKER -p tcp --dport 443 -j DNAT --to-destination 172.17.0.2:443
iptables -t nat -A POSTROUTING -j MASQUERADE -p tcp --source 172.17.0.2 --destination 172.17.0.2 --dport https
iptables -A DOCKER -j ACCEPT -p tcp --destination 172.17.0.2 --dport https
