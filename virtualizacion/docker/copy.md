Copiar ficheros entre el host y el container

COPY mejor que ADD



# Copiar ficheros entre el docker host y un container
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH

Copy files/folders between a container and the local filesystem

Options:
  -L, --follow-link   Always follow symbol link in SRC_PATH
        --help          Print usage
