Almacen de artefactos (rpm, deb, imagenes docker, etc)

La version Opensource parece que solo permite subir objetos tipo "Maven". No RPMs, deb, docker, npm, etc

Otras opciones:
packagedrone.md
https://binary-repositories-comparison.github.io/

# docker
https://hub.docker.com/r/mattgruter/artifactory/

mkdir data logs backup
docker run -d -v "$PWD/data:/artifactory/data" -v "$PWD/logs:/artifactory/logs -v "$PWD/backup:/artifactory/backup" -p 8080:8080 mattgruter/artifactory


# Admin
Para crear repositorios ir a "Admin > Repositories"


# Subir RPM
curl -u myUser:myP455w0rd! -X PUT "http://localhost:8081/artifactory/my-repository/my/new/artifact/directory/file.txt" -T Desktop/myNewFile.txt

