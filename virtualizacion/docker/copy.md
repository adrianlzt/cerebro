Copiar ficheros entre el host y el container

COPY mejor que ADD


COPY dir/ /dest/path/
  copia el contenido de dir en /dest/path

COPY dir /dest/path
  copia "dir/" en /dest/path/


# Copiar ficheros entre el docker host y un container
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH

docker cp ./ container:/mnt
  copia todos los ficheros en el current dir al dir /mnt/ del container

Copy files/folders between a container and the local filesystem

Options:
  -L, --follow-link   Always follow symbol link in SRC_PATH
        --help          Print usage
