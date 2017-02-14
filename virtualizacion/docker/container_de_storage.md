Es la manera cutre de hacer que varios containers tengan el mismo storage sin que ninguno de los "principales" sea el responsable

Si tienes varios containers que quiers que escriban en el mismo sitio, delegas en un container disjunto la tarea de mantener el FS vivo
Así si por cualquier cosa alguno de los containers que da servicio se cae, el disco no se ve afectado porque está en otro container


Se suele usar para cuando la imagen que levanta el disco hace algo como monitorizarlo o compartirlo por nfs con otros sistemas no docker o lo que sea


La otra opción es mapear a un dir del docker host directamente.


Ejemplo:

# create /var/lib/grafana as persistent volume storage
docker run -d -v /var/lib/grafana --name grafana-storage busybox:latest

# start grafana
docker run -d -p 3000:3000 --name=grafana --volumes-from grafana-storage grafana/grafana
