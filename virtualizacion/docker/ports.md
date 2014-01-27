http://docs.docker.io/en/latest/use/port_redirection/

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
