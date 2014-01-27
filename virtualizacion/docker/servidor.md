Command line client <------Unix-socket-----> REST server daemon
Se puede cambiar el server para que corra sobre un puerto.

nc -U /var/run/docker.sock
GET /images/json HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 14 Jan 2014 19:33:35 GMT
Content-Length: 1084

[{"Id":"eeb841a
