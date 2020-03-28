https://docs.docker.com/engine/admin/start-containers-automatically/
Politica de que hacer cuando se para un contenedor

Lo podemos usar con unless-stopped para que se arranquen los containers tras un reinicio del demonio.


Se puede modificar en caliente
docker update --restart=always CONTAINERID


--restart=unless-stopped
